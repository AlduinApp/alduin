import * as Form from '@radix-ui/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import {
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import useModal from '../../hooks/useModal';
import useViewDispatch from '../../hooks/useViewDispatch';
import FeedService from '../../services/FeedService';
import {
  CLOSE_MODAL,
  SET_ACTIVE_ARTICLE,
} from '../../state/view/ViewActionType';
import QueryKey from '../../utils/QueryKey';
import Button from '../form/Button';
import Field from '../form/Field';
import Select from '../form/Select';

import Modal from './Modal';

const intervalOptions = [
  { label: '1 minute', value: '1' },
  { label: '5 minutes', value: '5' },
  { label: '15 minutes', value: '15' },
  { label: '30 minutes', value: '30' },
  { label: '1 hour', value: '60' },
  { label: '2 hours', value: '120' },
  { label: '4 hours', value: '240' },
  { label: '8 hours', value: '480' },
];

export interface ModalFormContent {
  identifier: string;
  displayName: string;
  url: string;
  interval: number;
}

const modalIdentifier = 'addFeed';

function AddFeedModal() {
  const viewDispatch = useViewDispatch();

  const { isOpen, state, isStateEmpty } =
    useModal<ModalFormContent>(modalIdentifier);
  const isEditing = useMemo(() => !isStateEmpty, [isStateEmpty]);

  const defaultForm = useMemo(
    () =>
      isEditing
        ? state
        : ({
            displayName: '',
            url: '',
            interval: Number.parseInt(intervalOptions[1].value, 10),
          } as ModalFormContent),
    [isEditing, state],
  );

  const [form, setForm] = useState<ModalFormContent>(defaultForm);

  useEffect(() => {
    setForm(defaultForm);
  }, [defaultForm]);

  const queryClient = useQueryClient();

  const addMutation = useMutation(FeedService.addFeed, {
    onSuccess: () => queryClient.invalidateQueries(QueryKey.feeds()),
  });
  const updateMutation = useMutation(FeedService.updateFeed, {
    onSuccess: () => queryClient.invalidateQueries(QueryKey.feeds()),
  });
  const deleteMutation = useMutation(FeedService.deleteFeed, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QueryKey.feeds());
      viewDispatch({
        type: SET_ACTIVE_ARTICLE,
        payload: { identifier: null },
      });
    },
  });

  const closeModal = useCallback(() => {
    viewDispatch({
      type: CLOSE_MODAL,
      payload: { identifier: modalIdentifier },
    });

    setForm({
      identifier: '',
      displayName: '',
      url: '',
      interval: Number.parseInt(intervalOptions[1].value, 10),
    });
  }, [viewDispatch]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      (isEditing ? updateMutation : addMutation).mutate(form);
      closeModal();
    },
    [addMutation, closeModal, form, isEditing, updateMutation],
  );

  const handleDelete = useCallback(() => {
    deleteMutation.mutate(form.identifier);
    closeModal();
  }, [closeModal, deleteMutation, form.identifier]);

  const title = useMemo(
    () => (isEditing ? 'Edit feed' : 'Add feed'),
    [isEditing],
  );

  return (
    <Modal open={isOpen} identifier={modalIdentifier} title={title}>
      <Form.Root onSubmit={handleSubmit}>
        <Field
          type="text"
          required
          pattern=".{1,50}"
          label="Display name"
          name="displayName"
          messages={{
            valueMissing: 'Missing value',
            patternMismatch: 'Invalid value',
          }}
          value={form.displayName}
          onChange={(event) =>
            setForm({ ...form, displayName: event.target.value })
          }
        />

        <Field
          type="url"
          required
          label="Feed link"
          name="feedLink"
          messages={{
            valueMissing: 'Missing value',
            typeMismatch: 'Invalid URL',
          }}
          value={form.url}
          onChange={(event) => setForm({ ...form, url: event.target.value })}
          disabled={!isStateEmpty}
        />

        <Select
          name="interval"
          label="Interval"
          placeholder="Select an interval"
          options={intervalOptions}
          value={`${form.interval}`}
          onChange={(interval) => {
            setForm({ ...form, interval: Number.parseInt(interval, 10) });
          }}
        />

        <div
          className={clsx(
            'mt-4 flex justify-between',
            isEditing ? 'flex-row' : 'flex-row-reverse',
          )}
        >
          {isEditing && (
            <Button variant="danger" type="button" onClick={handleDelete}>
              Delete feed
            </Button>
          )}
          <Form.Submit asChild>
            <Button variant="primary">
              {isEditing ? 'Edit feed' : 'Add feed'}
            </Button>
          </Form.Submit>
        </div>
      </Form.Root>
    </Modal>
  );
}

export default memo(AddFeedModal);

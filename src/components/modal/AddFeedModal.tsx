import * as Form from '@radix-ui/react-form';
import clsx from 'clsx';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import useDataDispatch from '../../hooks/useDataDispatch';
import useModal from '../../hooks/useModal';
import useViewDispatch from '../../hooks/useViewDispatch';
import {
  ADD_FEED,
  REMOVE_FEED,
  UPDATE_FEED,
} from '../../state/data/DataActionType';
import { CLOSE_MODAL } from '../../state/view/ViewActionType';
import Button from '../form/Button';
import Field from '../form/Field';
import IconButton from '../form/IconButton';

import Modal from './Modal';

export interface ModalFormContent {
  identifier: string;
  displayName: string;
  feedLink: string;
}

const modalIdentifier = 'addFeed';

export function AddFeedModal() {
  const viewDispatch = useViewDispatch();
  const dataDispatch = useDataDispatch();

  const { open, isOpen, state, isStateEmpty } =
    useModal<ModalFormContent>(modalIdentifier);

  const isEditing = useMemo(() => !isStateEmpty, [isStateEmpty]);

  const defaultForm = useMemo(
    () =>
      isEditing
        ? state
        : ({
            displayName: '',
            feedLink: '',
          } as ModalFormContent),
    [isEditing, state],
  );

  const [form, setForm] = useState<ModalFormContent>(defaultForm);

  useEffect(() => {
    setForm(defaultForm);
  }, [defaultForm]);

  const closeModal = useCallback(() => {
    viewDispatch({
      type: CLOSE_MODAL,
      payload: { identifier: modalIdentifier },
    });

    setForm({
      identifier: '',
      displayName: '',
      feedLink: '',
    });
  }, [viewDispatch]);

  const handleOpen = useCallback(() => {
    open();
  }, [open]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (isEditing) {
        dataDispatch({
          type: UPDATE_FEED,
          payload: {
            identifier: form.identifier,
            displayName: form.displayName,
            link: form.feedLink,
          },
        });
      } else {
        dataDispatch({
          type: ADD_FEED,
          payload: {
            displayName: form.displayName,
            link: form.feedLink,
          },
        });
      }

      closeModal();
    },
    [
      closeModal,
      dataDispatch,
      form.displayName,
      form.feedLink,
      form.identifier,
      isEditing,
    ],
  );

  const handleDelete = useCallback(() => {
    dataDispatch({
      type: REMOVE_FEED,
      payload: {
        identifier: form.identifier,
      },
    });

    closeModal();
  }, [closeModal, dataDispatch, form.identifier]);

  return (
    <Modal open={isOpen} identifier={modalIdentifier}>
      <IconButton Icon={FaPlus} onClick={handleOpen} />
      {isEditing ? 'Edit feed' : 'Add feed'}
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
          value={form.feedLink}
          onChange={(event) =>
            setForm({ ...form, feedLink: event.target.value })
          }
          disabled={!isStateEmpty}
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
      <p>Footer</p>
    </Modal>
  );
}

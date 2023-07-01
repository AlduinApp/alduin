import * as Form from '@radix-ui/react-form';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import useDataDispatch from '../../hooks/useDataDispatch';
import useModal from '../../hooks/useModal';
import useSync from '../../hooks/useSync';
import useViewDispatch from '../../hooks/useViewDispatch';
import { ADD_FEED } from '../../state/data/DataActionType';
import { CLOSE_MODAL, OPEN_MODAL } from '../../state/view/ViewActionType';
import Button from '../form/Button';
import Field from '../form/Field';
import IconButton from '../form/IconButton';

import Modal from './Modal';

interface FormContent {
  displayName: string;
  feedLink: string;
}

const modalIdentifier = 'addFeed';

export function AddFeedModal() {
  const viewDispatch = useViewDispatch();
  const dataDispatch = useDataDispatch();

  const { open, state, isStateEmpty } = useModal<FormContent>(modalIdentifier);

  const isEditing = useMemo(() => !isStateEmpty, [isStateEmpty]);

  const defaultForm = useMemo(
    () =>
      isEditing
        ? state
        : ({
            displayName: '',
            feedLink: '',
          } as FormContent),
    [isEditing, state],
  );

  const [form, setForm] = useState<FormContent>(defaultForm);

  useEffect(() => {
    setForm(defaultForm);
  }, [defaultForm]);

  const handleOpenChange = useCallback(
    (newState: boolean) => {
      viewDispatch({
        type: newState ? OPEN_MODAL : CLOSE_MODAL,
        payload: { identifier: modalIdentifier },
      });
    },
    [viewDispatch],
  );

  const handleOpen = useCallback(() => {
    viewDispatch({
      type: OPEN_MODAL,
      payload: { identifier: 'addFeed', state: null },
    });
  }, [viewDispatch]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      dataDispatch({
        type: ADD_FEED,
        payload: {
          displayName: form.displayName,
          link: form.feedLink,
        },
      });

      viewDispatch({
        type: CLOSE_MODAL,
        payload: { identifier: modalIdentifier },
      });

      setForm({
        displayName: '',
        feedLink: '',
      });
    },
    [dataDispatch, form.displayName, form.feedLink, viewDispatch],
  );

  return (
    <Modal open={open} onOpenChange={handleOpenChange}>
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
        <div className="mt-4 flex justify-end">
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

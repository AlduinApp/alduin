import * as Form from '@radix-ui/react-form';
import clsx from 'clsx';
import {
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FaCogs } from 'react-icons/fa';

import useModal from '../../hooks/useModal';
import usePreference from '../../hooks/usePreference';
import usePreferenceDispatch from '../../hooks/usePreferenceDispatch';
import useViewDispatch from '../../hooks/useViewDispatch';
import { SET_PREFERENCES } from '../../state/preference/PreferenceActionType';
import { PreferenceState } from '../../state/preference/PreferenceReducer';
import { CLOSE_MODAL } from '../../state/view/ViewActionType';
import Button from '../form/Button';
import IconButton from '../form/IconButton';
import Switch from '../form/Switch';

import Modal from './Modal';

const modalIdentifier = 'preference';

function PreferenceModal() {
  const preference = usePreference();
  const preferenceDispatch = usePreferenceDispatch();
  const viewDispatch = useViewDispatch();
  const { open, isOpen, state, isStateEmpty } =
    useModal<PreferenceState>(modalIdentifier);

  const defaultForm = useMemo(
    () => (isStateEmpty ? { darkMode: false } : state),
    [isStateEmpty, state],
  );

  const [form, setForm] = useState<PreferenceState>(defaultForm);
  useEffect(() => {
    setForm(defaultForm);
  }, [defaultForm]);

  const closeModal = useCallback(() => {
    viewDispatch({
      type: CLOSE_MODAL,
      payload: { identifier: modalIdentifier },
    });

    setForm(preference);
  }, [preference, viewDispatch]);

  const handleOpen = useCallback(() => {
    open(preference);
  }, [open, preference]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      preferenceDispatch({
        type: SET_PREFERENCES,
        payload: form,
      });

      closeModal();
    },
    [closeModal, form, preferenceDispatch],
  );

  return (
    <Modal open={isOpen} identifier={modalIdentifier}>
      <IconButton Icon={FaCogs} onClick={handleOpen} />
      Edit preferences
      <Form.Root onSubmit={handleSubmit}>
        <Switch
          label="Dark mode"
          name="dark"
          value={form.darkMode}
          onChange={(darkMode) => setForm({ ...form, darkMode })}
        />

        <div className={clsx('mt-4 flex justify-between flex-row-reverse')}>
          <Form.Submit asChild>
            <Button variant="primary">Save</Button>
          </Form.Submit>
        </div>
      </Form.Root>
      <p>Footer</p>
    </Modal>
  );
}

export default memo(PreferenceModal);

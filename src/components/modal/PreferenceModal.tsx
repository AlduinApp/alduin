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
import usePreferences from '../../hooks/usePreferences';
import useViewDispatch from '../../hooks/useViewDispatch';
import PreferencesService, {
  IPreferences,
} from '../../services/PreferencesService';
import { CLOSE_MODAL } from '../../state/view/ViewActionType';
import QueryKey from '../../utils/QueryKey';
import Button from '../form/Button';
import Switch from '../form/Switch';

import Modal from './Modal';

const modalIdentifier = 'preference';

function PreferenceModal() {
  const preference = usePreferences();
  const viewDispatch = useViewDispatch();
  const { isOpen, state, isStateEmpty } =
    useModal<IPreferences>(modalIdentifier);

  const defaultForm = useMemo(
    () => (isStateEmpty ? PreferencesService.defaultPreferences : state),
    [isStateEmpty, state],
  );

  const [form, setForm] = useState<IPreferences>(defaultForm);
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

  const queryClient = useQueryClient();
  const preferencesMutation = useMutation(PreferencesService.setPreferences, {
    onSuccess: () => queryClient.invalidateQueries(QueryKey.preferences()),
  });

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      preferencesMutation.mutate(form);

      closeModal();
    },
    [closeModal, form, preferencesMutation],
  );

  return (
    <Modal open={isOpen} identifier={modalIdentifier} title="Edit preferences">
      <Form.Root onSubmit={handleSubmit}>
        <Switch
          label="Dark mode"
          name="dark"
          value={form.darkMode}
          onChange={(darkMode) => setForm({ ...form, darkMode })}
        />
        <Switch
          label="Show feed icons"
          name="showFeedIcons"
          value={form.showFeedIcons}
          onChange={(showFeedIcons) => setForm({ ...form, showFeedIcons })}
        />
        <Switch
          label="Show article thumbnails"
          name="showArticleThumbnails"
          value={form.showArticleThumbnails}
          onChange={(showArticleThumbnails) =>
            setForm({ ...form, showArticleThumbnails })
          }
        />
        <div className="flex flex-row gap-8">
          <Switch
            label="Launch at startup"
            name="autoStart"
            value={form.autoStart}
            onChange={(autoStart) =>
              setForm({
                ...form,
                autoStart,
                startMinimized: !autoStart ? false : form.startMinimized,
              })
            }
          />
          {form.autoStart && (
            <Switch
              label="Start minimized"
              name="startMinimized"
              value={form.startMinimized}
              onChange={(startMinimized) =>
                setForm({ ...form, startMinimized })
              }
            />
          )}
        </div>

        <div className={clsx('mt-4 flex justify-between flex-row-reverse')}>
          <Form.Submit asChild>
            <Button variant="primary">Save</Button>
          </Form.Submit>
        </div>
      </Form.Root>
    </Modal>
  );
}

export default memo(PreferenceModal);

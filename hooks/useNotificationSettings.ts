import { useCallback, useEffect, useRef, useState } from "react";
import NotificationSettingsAPI from "@/lib/api/notificationSettings";
import {
  defaultNotificationSettings,
  type NotificationSettings,
} from "@/types/notification-settings";

export const useNotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettings>(
    defaultNotificationSettings(),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      const res = await NotificationSettingsAPI.get();
      if (!cancelled && res?.settings) {
        setSettings(res.settings);
      }
      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateSetting = useCallback(
    async <K extends keyof NotificationSettings>(
      key: K,
      value: NotificationSettings[K],
    ) => {
      const previous = settingsRef.current;
      const next = { ...previous, [key]: value };
      setSettings(next);
      setSaving(true);

      try {
        const res = await NotificationSettingsAPI.update({ [key]: value });
        if (res?.settings) {
          setSettings(res.settings);
          return;
        }
        setSettings(previous);
      } catch {
        setSettings(previous);
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  return {
    settings,
    loading,
    saving,
    updateSetting,
  };
};

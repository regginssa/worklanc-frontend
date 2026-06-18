import { request } from "./client";
import type { NotificationSettings } from "@/types/notification-settings";

const NotificationSettingsAPI = {
  get: async (): Promise<{ settings: NotificationSettings } | null> =>
    await request("/notification-settings/me", { method: "GET" }),

  update: async (
    patch: Partial<NotificationSettings>,
  ): Promise<{ settings: NotificationSettings } | null> =>
    await request("/notification-settings/me", {
      method: "PATCH",
      body: JSON.stringify({ settings: patch }),
    }),
};

export default NotificationSettingsAPI;

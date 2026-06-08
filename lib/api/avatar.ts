import AuthAPI from "./auth";
import TalentAPI from "./talent";
import UploadAPI, { resolveMediaAssetUrl } from "./upload";

/** Upload a new avatar, delete the previous S3 object, and persist to user + profile. */
export async function replaceUserAvatar(
  file: File,
  previousToken?: string | null,
) {
  const uploadResult = await UploadAPI.upload(file, "avatar");
  if (!uploadResult?.encryptedUrl) return null;

  const nextToken = uploadResult.encryptedUrl;

  if (previousToken && previousToken !== nextToken) {
    await UploadAPI.delete(previousToken);
  }

  const userRes = await AuthAPI.updateMe({ avatarUrl: nextToken });
  const profileRes = await TalentAPI.updateProfile({ photoUrl: nextToken });

  return {
    encryptedUrl: nextToken,
    displayUrl: resolveMediaAssetUrl(nextToken),
    user: userRes?.user ?? null,
    profile: profileRes?.profile ?? null,
    account: profileRes?.account ?? null,
  };
}

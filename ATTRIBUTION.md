Cloudburst Skills — Attribution & License Guidance

Summary

- This repository (top-level files and scripts maintained by Cloudburst) is published under the MIT license (see LICENSE.md).
- Many skill directories contain vendored or upstream content that retain their original licenses. Those LICENSE files and copyright notices must be preserved when redistributing.

What you must preserve when redistributing

- Keep a copy of the original LICENSE file for any vendored or third-party skill included in distributions.
- Preserve existing copyright notices in files as-is. Do not remove or alter copyright lines unless you are the copyright owner or have explicit permission.
- Include an attribution/notice section in your redistribution that points to the original source where practical.

What you can change

- You may modify, adapt, and rebrand files that you or Cloudburst authored.
- You may combine MIT-licensed code into projects with different licenses for your own original code, but you must still include the MIT text and original notices for the MIT parts.

Practical recommendations

- When preparing a distribution (source archive, npm package, or binary), include:
  - Top-level `LICENSE.md` (this repo's MIT license)
  - Any LICENSE files present in `skills/*` or `vendor/*` directories
  - A short `ATTRIBUTION.md` (this file) explaining which directories are third-party and any special license notes

- For rebranding: avoid modifying vendor LICENSE files or changing copyright ownership lines in vendored directories.

Legal note

This file is a brief guidance document, not legal advice. For commercial redistribution, relicensing, or transfer of ownership, consult legal counsel.

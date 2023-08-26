module.exports = {
  '*.{ts,tsx}': (filenames) => [
    'yarn validate',
    'yarn nx run-many --target=build',
  ],
}

#!/bin/bash
cd /home/kavia/workspace/code-generation/quicknotes-94677-754b9841/quicknotes_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi


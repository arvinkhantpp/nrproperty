import * as migration_20261126_095637_initial from './20261126_095637_initial';

export const migrations = [
  {
    up: migration_20261126_095637_initial.up,
    down: migration_20261126_095637_initial.down,
    name: '20261126_095637_initial'
  },
];

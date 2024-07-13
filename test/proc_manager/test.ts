import { describe, expect, test } from 'vitest';
import { createProcManager, LogLinesReadonly } from '../../src/utils/proc_manager';

const SCRIPT_NAME_1 = 'test1';
const SCRIPT_COMMAND_1 = 'cmd1';
const SCRIPT_NAME_2 = 'test2';
const SCRIPT_COMMAND_2 = 'cmd2';
const SCRIPT_NAME_3 = 'test3';
const SCRIPT_COMMAND_3 = 'cmd3';

const fakeCwd = '/fakeCwd';
const fakeNpmClient = 'fake-npm';

const logLinesToStrLines = (logLines: LogLinesReadonly): string[] => {
  // TODO
};

describe('todo', () => {
  test('todo1', () => {
    const c = createXXX();
    c.addFakeProc(SCRIPT_NAME_1, (h) => [h.strLn('1abc1'), h.strLn('1def1'), h.end()]);
    c.addFakeProc(SCRIPT_NAME_2, (h) => [h.strLn('2abc2'), h.strLn('2def2'), h.end()]);
    c.addFakeProc(SCRIPT_NAME_3, (h) => [h.bufLn(Buffer.from([0x03, 0x13, 0x23, 0x33, 0x43])), h.end()]);
    const pm = createProcManager({
      historyCacheSize: 3,
      historyAlwaysKeepHeadSize: 3,
      enableUnreadMarker: true,
      isColorSupported: true,

      crossKill: c.fakeCrossKill,
      crossSpawn: c.fakeCrossSpawn,
    });
    pm.createNode({
      name: SCRIPT_NAME_1,
      type: 'none',
      procOwn: {
        command: SCRIPT_COMMAND_1,
        cwd: fakeCwd,
        npmPath: fakeNpmClient,
      },
      status: 'running',
    });
    c.tick();
    expect(pm.rootNode.logAccumulated.lineCount).toBe(2);
    expect(logLinesToStrLines(pm.rootNode.logAccumulated.lines)).toBe(['1abc1', '1def1']);
    expect(c.calls).toBe([
      {
        name: SCRIPT_NAME_1,
        command: SCRIPT_COMMAND_1,
        cwd: fakeCwd,
        npmPath: fakeNpmClient,
      },
    ]);
  });

  test('todo2', () => {
    const fakeCwd = '/fakeCwd';
    const fakeNpmClient = 'fake-npm';
    const c = createXXX();
    c.addFakeProc(SCRIPT_NAME_1, (h) => [h.strLn('1abc1'), h.strLn('1def1'), h.end()]);
    c.addFakeProc(SCRIPT_NAME_2, (h) => [h.strLn('2abc2'), h.strLn('2def2'), h.end()]);
    c.addFakeProc(SCRIPT_NAME_3, (h) => [h.bufLn(Buffer.from([0x03, 0x13, 0x23, 0x33, 0x43])), h.end()]);
    const pm = createProcManager({
      historyCacheSize: 3,
      historyAlwaysKeepHeadSize: 3,
      enableUnreadMarker: true,
      isColorSupported: true,

      crossKill: c.fakeCrossKill,
      crossSpawn: c.fakeCrossSpawn,
    });
    pm.createNode({
      name: SCRIPT_NAME_3,
      type: 'none',
      procOwn: {
        command: SCRIPT_COMMAND_3,
        cwd: fakeCwd,
        npmPath: fakeNpmClient,
      },
      status: 'running',
    });
    c.tick();
    expect(pm.rootNode.logAccumulated.lineCount).toBe(2);
    expect(logLinesToStrLines(pm.rootNode.logAccumulated.lines)).toBe(['\u0023\u0033\u0043']);
  });
});

/**
 * @Author: whr
 * @Date: 2022-11-29 15:31:54
 * @Desc: commit提交规范
 */

module.exports = {
  allowBreakingChanges: ['feat', 'fix'],
  allowCustomScopes: true,
  types: [
    { name: '配置: 新增项目工程化配置(config)', value: 'config' },
    {
      name: '功能：新增功能，迭代项目需求 (feat)',
      value: 'feat',
    },
    {
      name: '修复：修复缺陷，修复上一版本存在问题 (fix)',
      value: 'fix',
    },
    {
      name: '文档：更新文档，仅改动文档不改动代码 (docs)',
      value: 'docs',
    },
    {
      name: '样式：变动格式，不影响代码逻辑 (style)',
      value: 'style',
    },
    {
      name: '重构：重构代码，非新增功能也非修改缺陷 (refactor)',
      value: 'refactor',
    },
    {
      name: '性能：优化性能，提高代码执行性能 (perf)',
      value: 'perf',
    },
    {
      name: '测试：新增测试，追加测试用例验证代码 (test)',
      value: 'test',
    },
    {
      name: '构建：更新构建，改动构建工具或外部依赖 (build)',
      value: 'build',
    },
    {
      name: '脚本：更新脚本，改动CI或执行脚本配置 (ci)',
      value: 'ci',
    },
    {
      name: '事务：变动事务，改动其他不影响代码的事务 (chore)',
      value: 'chore',
    },
    {
      name: '回滚：回滚版本，撤销某次代码提交 (revert)',
      value: 'revert',
    },
    {
      name: '合并：合并分支，合并分支代码到其他分支 (merge)',
      value: 'merge',
    },
    {
      name: '同步：同步分支，同步分支代码到其他分支 (sync)',
      value: 'sync',
    },
    {
      name: '改进：改进功能，升级当前功能模块 (impr)',
      value: 'impr',
    },
  ],
  subjectLimit: 100,
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body:
      'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer:
      'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },
  // it needs to match the value for field type. Eg.: 'fix'
  scopeOverrides: {
    fix: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'e2eTest' },
      { name: 'unitTest' },
    ],
  },
}

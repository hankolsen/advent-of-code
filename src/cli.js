const path = require('path');
const { Command } = require('commander');

const init = require('./init');


const main = (args = process.argv, program = new Command()) => {
  const defaultNameTemplate = 'solve.js';
  const defaultTemplateFile = path.resolve(__dirname, 'templates', 'day.js');

  program.on(
    '--help', () => {
      console.log('hej');
    },
  );

  let action;

  program
    .command('init <day>')
    .description('Initialize a given day')
    .option(
      '-n, --name-template [template',
      'The template filename',
      defaultNameTemplate,
    )
    .option(
      '-t, --template-file [filepath]',
      'The path to the template file',
      defaultTemplateFile,
    )
    .action((day, command) => {
      console.log(day, command);
      action = init();
    });

  program.parse(args);

  return action;
};

module.exports = main;

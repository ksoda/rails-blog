# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

require 'rubocop/rake_task'
RuboCop::RakeTask.new do |t|
  t.options = ['--parallel']
end

task(:default).clear
task default: %i[rubocop spec]

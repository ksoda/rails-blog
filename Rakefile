# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

require 'rubocop/rake_task'
RuboCop::RakeTask.new do |t|
  t.options = ['--parallel']
end

namespace :brakeman do
  desc 'Run Brakeman'
  task(:run, :output_files) do |_t, args| # rubocop:disable Rails/RakeEnvironment
    require 'brakeman'

    files = args[:output_files].split(' ') if args[:output_files]
    Brakeman.run app_path: '.', output_files: files, pager: false
  end
end

task(:default).clear
task default: %i[rubocop spec brakeman:run]

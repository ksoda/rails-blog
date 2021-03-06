# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: strict
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/strong_migrations/all/strong_migrations.rbi
#
# strong_migrations-0.7.3

module StrongMigrations
  def self.add_check(&block); end
  def self.auto_analyze; end
  def self.auto_analyze=(arg0); end
  def self.check_down; end
  def self.check_down=(arg0); end
  def self.check_enabled?(check, version: nil); end
  def self.checks; end
  def self.checks=(arg0); end
  def self.developer_env?; end
  def self.disable_check(check); end
  def self.enable_check(check, start_after: nil); end
  def self.enabled_checks; end
  def self.enabled_checks=(arg0); end
  def self.error_messages; end
  def self.error_messages=(arg0); end
  def self.lock_timeout; end
  def self.lock_timeout=(arg0); end
  def self.lock_timeout_limit; end
  def self.lock_timeout_limit=(arg0); end
  def self.safe_by_default; end
  def self.safe_by_default=(arg0); end
  def self.start_after; end
  def self.start_after=(arg0); end
  def self.statement_timeout; end
  def self.statement_timeout=(arg0); end
  def self.target_mariadb_version; end
  def self.target_mariadb_version=(arg0); end
  def self.target_mysql_version; end
  def self.target_mysql_version=(arg0); end
  def self.target_postgresql_version; end
  def self.target_postgresql_version=(arg0); end
  def self.target_version; end
  def self.target_version=(arg0); end
end
module StrongMigrations::SafeMethods
  def disable_transaction; end
  def in_transaction?; end
  def safe_add_foreign_key(from_table, to_table, options); end
  def safe_add_foreign_key_code(from_table, to_table, add_code, validate_code); end
  def safe_add_index(table, columns, options); end
  def safe_add_reference(table, reference, options); end
  def safe_by_default_method?(method); end
  def safe_change_column_null(add_code, validate_code, change_args, remove_code); end
  def safe_remove_index(table, options); end
end
class StrongMigrations::Checker
  def backfill_code(table, column, default); end
  def check_lock_timeout; end
  def command_str(command, args); end
  def connection; end
  def constraint_str(statement, identifiers); end
  def constraints(table_name); end
  def direction; end
  def direction=(arg0); end
  def initialize(migration); end
  def mariadb?; end
  def mariadb_version; end
  def mysql?; end
  def mysql_version; end
  def new_table?(table); end
  def perform(method, *args); end
  def postgresql?; end
  def postgresql_timeout(timeout); end
  def postgresql_version; end
  def raise_error(message_key, header: nil, append: nil, **vars); end
  def rewrite_blocks; end
  def safe?; end
  def safety_assured; end
  def safety_assured_str(code); end
  def set_timeouts; end
  def target_version(target_version); end
  def timeout_to_sec(timeout); end
  def transaction_disabled; end
  def transaction_disabled=(arg0); end
  def version; end
  def version_safe?; end
  def writes_blocked?; end
  include StrongMigrations::SafeMethods
end
module StrongMigrations::DatabaseTasks
  def migrate; end
end
module StrongMigrations::Migration
  def method_missing(method, *args); end
  def migrate(direction); end
  def safety_assured; end
  def stop!(message, header: nil); end
  def strong_migrations_checker; end
end
class StrongMigrations::Railtie < Rails::Railtie
end
class StrongMigrations::Error < StandardError
end
class StrongMigrations::UnsafeMigration < StrongMigrations::Error
end

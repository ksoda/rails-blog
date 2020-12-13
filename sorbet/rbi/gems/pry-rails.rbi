# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: strict
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/pry-rails/all/pry-rails.rbi
#
# pry-rails-0.3.9

module PryRails
end
class PryRails::Railtie < Rails::Railtie
end
class PryRails::RecognizePath < Pry::ClassCommand
  def options(opt); end
  def process(path); end
end
class PryRails::ShowModel < Pry::ClassCommand
  def options(opt); end
  def process; end
end
class PryRails::ShowMiddleware < Pry::ClassCommand
  def options(opt); end
  def print_middleware(middlewares); end
  def process; end
end
class PryRails::ShowRoutes < Pry::ClassCommand
  def grep_routes(formatted); end
  def options(opt); end
  def process; end
  def process_rails_3_0_and_3_1(all_routes); end
  def process_rails_3_2(all_routes); end
  def process_rails_4_and_5(all_routes); end
  def process_rails_6_and_higher(all_routes); end
end
class PryRails::FindRoute < Pry::ClassCommand
  def all_actions(controller); end
  def controller_and_action_from(controller_and_action); end
  def normalize_controller_name(controller); end
  def process(controller); end
  def route_helper(name); end
  def routes; end
  def show_routes(&block); end
  def single_action(controller); end
  def single_action?(controller); end
  def verb_for(route); end
end
class PryRails::ShowModels < Pry::ClassCommand
  def colorize_matches(string); end
  def display_activerecord_models; end
  def display_mongoid_models; end
  def grep_regex; end
  def options(opt); end
  def print_unless_filtered(str); end
  def process; end
end
class PryRails::ModelFormatter
  def format_active_record(model); end
  def format_association(type, other, options = nil); end
  def format_column(name, type); end
  def format_error(message); end
  def format_model_name(model); end
  def format_mongoid(model); end
  def kind_of_relation(relation); end
  def text; end
end
class PryRails::Prompt
  def self.formatted_env; end
  def self.project_name; end
end

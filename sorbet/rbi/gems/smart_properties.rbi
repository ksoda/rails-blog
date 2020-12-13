# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: true
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/smart_properties/all/smart_properties.rbi
#
# smart_properties-1.15.0

module SmartProperties
  def [](name); end
  def []=(name, value); end
  def initialize(*args, &block); end
  def self.included(base); end
end
class SmartProperties::PropertyCollection
  def [](name); end
  def []=(name, value); end
  def children; end
  def children=(arg0); end
  def collection; end
  def collection=(arg0); end
  def collection_with_parent_collection; end
  def collection_with_parent_collection=(arg0); end
  def each(&block); end
  def initialize; end
  def key?(name); end
  def keys; end
  def notify_children; end
  def parent; end
  def refresh(parent_collection); end
  def register(child); end
  def self.for(scope); end
  def to_hash; end
  def values; end
  include Enumerable
end
class SmartProperties::Property
  def accepter; end
  def accepts?(value, scope); end
  def convert(scope, value); end
  def converter; end
  def default(scope); end
  def define(klass); end
  def get(scope); end
  def initialize(name, attrs = nil); end
  def instance_variable_name; end
  def missing?(scope); end
  def name; end
  def null_object?(object); end
  def optional?(scope); end
  def prepare(scope, value); end
  def present?(scope); end
  def reader; end
  def required?(scope); end
  def self.define(scope, name, options = nil); end
  def set(scope, value); end
  def set_default(scope); end
  def to_h; end
  def writable; end
  def writable?; end
end
class SmartProperties::Error < ArgumentError
end
class SmartProperties::ConfigurationError < SmartProperties::Error
end
class SmartProperties::AssignmentError < SmartProperties::Error
  def initialize(sender, property, message); end
  def property; end
  def property=(arg0); end
  def sender; end
  def sender=(arg0); end
end
class SmartProperties::ConstructorArgumentForwardingError < SmartProperties::Error
  def generate_description(argument_type, argument_number); end
  def initialize(positional_arguments, keyword_arguments); end
end
class SmartProperties::MissingValueError < SmartProperties::AssignmentError
  def initialize(sender, property); end
  def to_hash; end
end
class SmartProperties::InvalidValueError < SmartProperties::AssignmentError
  def accepter_message(sender, property); end
  def initialize(sender, property, value); end
  def to_hash; end
  def value; end
  def value=(arg0); end
end
class SmartProperties::InitializationError < SmartProperties::Error
  def initialize(sender, properties); end
  def properties; end
  def properties=(arg0); end
  def sender; end
  def sender=(arg0); end
  def to_hash; end
end
module SmartProperties::Validations
end
class SmartProperties::Validations::Ancestor
  def self.must_be(*arg0); end
  def to_proc; end
  def to_s; end
  def validate(klass); end
  extend SmartProperties::ClassMethods
  include Anonymous_Module_29
  include SmartProperties
end
module Anonymous_Module_29
  def type; end
  def type=(value); end
end
module SmartProperties::ClassMethods
  def properties; end
  def property!(name, options = nil); end
  def property(name, options = nil); end
end

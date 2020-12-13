# typed: false
# frozen_string_literal: true

class ApplicationController < ActionController::Base #:nodoc:
  prepend_view_path Rails.root.join('frontend')
end

# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy
# For further information see the following documentation
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

Rails.application.config.content_security_policy do |policy|
  policy.default_src :self, :https
  policy.font_src    :self, :https, :data
  policy.img_src     :self, :https, :data
  policy.object_src  :none

  # TODO: Remove Alpine.js
  policy.script_src :unsafe_eval, :self, :https

  if Rails.env.development?
    # style-loader
    # https://github.com/rails/webpacker/blob/52386bc3784557ba02b9f5c0bcc29d22de64d2a6/docs/css.md#link-styles-from-your-rails-views
    policy.style_src :unsafe_inline, :self, :https
  else
    # mini-css-extract-plugin
    policy.style_src :self, :https
  end

  # Specify URI for violation reports
  # policy.report_uri "/csp-violation-report-endpoint"
  policy.connect_src :self, :https, 'http://localhost:3035', 'ws://localhost:3035' if Rails.env.development?
end

# If you are using UJS then enable automatic nonce generation
# Rails.application.config.content_security_policy_nonce_generator = -> request { SecureRandom.base64(16) }

# Set the nonce only to specific directives
# Rails.application.config.content_security_policy_nonce_directives = %w(script-src)

# Report CSP violations to a specified URI
# For further information see the following documentation:
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
# Rails.application.config.content_security_policy_report_only = true

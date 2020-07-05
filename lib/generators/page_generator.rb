# frozen_string_literal: true

class PageGenerator < Rails::Generators::Base #:nodoc:
  argument :name, required: true, desc: 'Page name, e.g: article'

  def create_view_file
    create_file "#{page_path}/_index.html.erb"
  end

  def create_css_file
    create_file "#{page_path}/style.pcss"
  end

  def create_js_file
    create_file "#{page_path}/index.js" do
      # require component's CSS inside JS automatically
      "import \"./style.pcss\";\n"
    end
  end

  protected

  def page_name
    name.underscore.dasherize
  end

  def page_path
    "frontend/pages/#{page_name}"
  end
end

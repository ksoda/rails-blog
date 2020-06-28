# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { 'MyString' }
    body { 'MyText' }
    published { false }
  end
end

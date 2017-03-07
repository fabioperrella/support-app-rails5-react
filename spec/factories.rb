FactoryGirl.define do
  sequence(:email) { |n| "John#{n}@lala.com"}
  sequence(:text) { |n| "lala popo #{n}" }
  sequence(:password) { |n| "dd34cw#{n}ff34" }
  sequence(:name) { |n| "John Spencer#{n}" }

  factory :user do
    email
    password
    name
    trait :admin do
      roles 'admin'
    end
  end

  factory :request do
    title { FactoryGirl.generate(:text) }
    description { FactoryGirl.generate(:text) }
    user
  end

  factory :comment do
    body { FactoryGirl.generate(:text) }
    user
    request
  end
end
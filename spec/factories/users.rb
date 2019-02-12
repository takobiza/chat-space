FactoryGirl.define do

  factory :user do
    password = Faker::Internet.password(8)
    nickname Faker::Name.last_name
    sequence(:email) {Faker::Internet.email}
    password password
    password_confirmation password
  end

end

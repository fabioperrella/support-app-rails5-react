class Request < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates :user, presence: true
  validates :title, presence: true

  include AASM

  aasm column: :state do
    state :opened, initial: true
    state :waiting_user_reply
    state :resolved

    event :resolve do
      transitions to: :resolved
    end
  end

  def as_json(opts={})
    #TODO: move to a presenter class
    original = super(opts)
    original.merge({
      'updated_at' => I18n.l(original['updated_at'], format: :short)
    })
  end
end
class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :request

  validates :user, presence: true
  validates :request, presence: true

  def as_json(opts={})
    #TODO: move to a presenter class
    original = super(opts)
    original.merge({
      'created_at' => I18n.l(original['created_at'], format: :short)
    })
  end
end
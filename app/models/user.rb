class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :requests

  validates :name, presence: true
  validates :email, presence: true

  def admin?
    Array(roles).include?(ADMIN_ROLE)
  end

  private

  ADMIN_ROLE = 'admin'
  private_constant :ADMIN_ROLE

end

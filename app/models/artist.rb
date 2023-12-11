class Artist < ApplicationRecord
    # encrypting artists password with bCrypt
    has_secure_password

    # defining artist associations
    has_one :artists_profile, dependent: :destroy
    has_one :artists_social, dependent: :destroy
    has_many :projects, dependent: :destroy
    
    # validating artist attributes
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :stage_name, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
end

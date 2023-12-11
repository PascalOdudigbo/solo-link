class Project < ApplicationRecord
  # specifying associations
  belongs_to :artist
  has_many :project_videos, dependent: :destroy

end

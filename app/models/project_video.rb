class ProjectVideo < ApplicationRecord
  # specifying associations
  belongs_to :project

  # validating attributes
  validates :video_url, presence: true
  validates :video_title, presence: true
end

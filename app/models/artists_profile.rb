class ArtistsProfile < ApplicationRecord
  # specifying artist profile associations
  belongs_to :artist

  # validating the artist profile attributes
  validates :artist_id, presence: true
end

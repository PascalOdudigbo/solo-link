class CreateArtistsProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :artists_profiles do |t|
      t.references :artist, null: false, foreign_key: true
      t.string :artist_image
      t.string :image_public_id
      t.string :bio

      t.timestamps
    end
  end
end

class CreateArtistsSocials < ActiveRecord::Migration[7.0]
  def change
    create_table :artists_socials do |t|
      t.references :artist, null: false, foreign_key: true
      t.string :instagram
      t.string :tiktok
      t.string :twitter
      t.string :facebook
      t.string :youtube

      t.timestamps
    end
  end
end

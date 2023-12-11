class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.references :artist, null: false, foreign_key: true
      t.string :title
      t.string :project_url
      t.string :cover_art
      t.string :cover_art_public_id

      t.timestamps
    end
  end
end

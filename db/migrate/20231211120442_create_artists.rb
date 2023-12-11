class CreateArtists < ActiveRecord::Migration[7.0]
  def change
    create_table :artists do |t|
      t.string :first_name
      t.string :last_name
      t.string :stage_name
      t.string :email
      t.string :verified
      t.string :password_digest

      t.timestamps
    end
  end
end

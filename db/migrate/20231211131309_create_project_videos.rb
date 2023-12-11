class CreateProjectVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :project_videos do |t|
      t.references :project, null: false, foreign_key: true
      t.string :video_title
      t.string :video_url

      t.timestamps
    end
  end
end

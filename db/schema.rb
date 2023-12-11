# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_12_11_131309) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "stage_name"
    t.string "email"
    t.string "verified"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "artists_profiles", force: :cascade do |t|
    t.bigint "artist_id", null: false
    t.string "artist_image"
    t.string "image_public_id"
    t.string "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_artists_profiles_on_artist_id"
  end

  create_table "artists_socials", force: :cascade do |t|
    t.bigint "artist_id", null: false
    t.string "instagram"
    t.string "tiktok"
    t.string "twitter"
    t.string "facebook"
    t.string "youtube"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_artists_socials_on_artist_id"
  end

  create_table "project_videos", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.string "video_title"
    t.string "video_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_videos_on_project_id"
  end

  create_table "projects", force: :cascade do |t|
    t.bigint "artist_id", null: false
    t.string "title"
    t.string "project_url"
    t.string "cover_art"
    t.string "cover_art_public_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_projects_on_artist_id"
  end

  add_foreign_key "artists_profiles", "artists"
  add_foreign_key "artists_socials", "artists"
  add_foreign_key "project_videos", "projects"
  add_foreign_key "projects", "artists"
end

# frozen_string_literal: true

class User < ApplicationRecord
  has_one_attached :photo
end

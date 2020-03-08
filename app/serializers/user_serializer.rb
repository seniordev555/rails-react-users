class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :email, :first_name, :last_name, :photo

  def photo
    if object.photo.attached?
      url_for(object.photo)
    else
      nil
    end
  end

  class << self
    def default_url_options
      Rails.application.config.action_mailer.default_url_options
    end
  end
end

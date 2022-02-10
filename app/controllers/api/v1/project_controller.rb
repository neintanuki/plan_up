module Api
  module V1
    class ProjectController < ActionController::API

      def create
        
      end

      private

      def secret_key
        return ENV['API_SALT']
      end

    end
  end
end
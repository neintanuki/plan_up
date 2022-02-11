require './lib/json_templates/project_create.rb'

module Api
  module V1
    class ProjectController < ApplicationController

      def create
        # @id
        @create = ProjectCreate.new
        @body = JSON.parse(request.raw_post)
        @title = @body["title"]
        @description= @body["description"]

        @user = User.find(@id)
        @project = @user.projects.create(
          title: @title,
          description: @description
        )

        if @project.save
          puts "success"

          render json: @create.success
        else
          puts "fail error"
          @create.errors = @project.errors
          render json: @create.fail
        end

      end


      private
      include ProjectCreate

      def secret_key
        return ENV['API_SALT']
      end



    end
  end
end
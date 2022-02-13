require './lib/json_templates/project_create.rb'
require './lib/json_templates/project_update.rb'
require './lib/json_templates/project_destroy.rb'
require './lib/json_templates/project_new.rb'

module Api
  module V1
    class ProjectController < ApplicationController

      def create
        # @id
        @create = ProjectCreate.new
        @body = JSON.parse(request.raw_post)
        @title = @body["title"]
        @description = @body["description"]

        @user = User.find(@id)
        @project = @user.projects.create(
          title: @title,
          description: @description
        )

        if @project.save
          render json: @create.success
        else
          @create.errors = @project.errors
          render json: @create.fail, status: :bad_request
        end
      end

      def new
        @new = ProjectNew.new
        @new.data = Project.where(user_id: @id)

        render json: @new.success
      end

      def update
        @body = JSON.parse(request.raw_post)
        @update = ProjectUpdate.new

        @project = Project.find(@body["id"])

        if @project.update(title: @body["title"], description: @body["description"])
          render json: @update.success
        else
          @update.errors = @project.errors
          render json: @update.fail, status: :bad_request
        end
      end

      def destroy
        @body = JSON.parse(request.raw_post)
        @destroy = ProjectDestroy.new
        @project = Project.find(@body["id"])

        @project.destroy

        render json: @destroy.success 
      end


      private
      include ProjectCreate
      include ProjectUpdate
      include ProjectDestroy
      include ProjectNew

      def secret_key
        return ENV['API_SALT']
      end



    end
  end
end
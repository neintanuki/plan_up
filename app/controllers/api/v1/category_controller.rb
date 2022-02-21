require './lib/json_templates/category_create.rb'
require './lib/json_templates/category_new.rb'
require './lib/json_templates/category_update.rb'
require './lib/json_templates/category_destroy.rb'

module Api
  module V1
    class CategoryController < ApplicationController

      def create
        # @id
        @body = JSON.parse(request.raw_post)
        @create = CategoryCreate.new

        if @body["project_id"]

          @project = Project.find_by(
            id: @body["project_id"],
            user_id: @id
          )

          @category = @project.categories.create(
            title: @body["title"]
          )

          if @category.save
            render json: @create.success
          else
            @create.errors = @category.errors

            render json: @create.fail, status: :bad_request
          end

        else
          @create.errors = {
            project_id: ["is empty"]
          }

          render json: @create.fail, status: :bad_request
        end

      end

      def new
        @project_id = params["project_id"]
        @new = CategoryNew.new
        @categories = Category.where(project_id: @project_id)
        @new.data = @categories

        render json: @new.success
      end

      def update
        @body = JSON.parse(request.raw_post)
        @update = CategoryUpdate.new
        @user = User.find(@id)
        @project = @user.projects.find(@body["project_id"])

        @category = @project.categories.find(@body["category_id"])

        if @category.update(title: @body["title"])
          render json: @update.success
        else
          @update.errors = @category.errors
          render json: @update.fail, status: :bad_request
        end
      end

      def destroy
        @body = JSON.parse(request.raw_post)
        @destroy = CategoryDestroy.new
        @user = User.find(@id)
        @project = @user.projects.find(@body["project_id"])
        @category = @project.categories.find(@body["category_id"])

        @category.destroy

        render json: @destroy.success 
      end

      private
      include CategoryCreate
      include CategoryNew
      include CategoryUpdate
      include CategoryDestroy

    end
  end
end
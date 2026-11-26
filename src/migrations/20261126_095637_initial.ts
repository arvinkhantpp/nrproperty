import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'bn');
  CREATE TYPE "public"."enum_leads_type" AS ENUM('enquiry', 'brochure', 'siteVisit', 'landowner', 'nrb', 'contact');
  CREATE TYPE "public"."enum_leads_segment" AS ENUM('buyer', 'landowner', 'nrb');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'visitBooked', 'booked', 'lost');
  CREATE TYPE "public"."enum_pages_blocks_hero_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('photo', 'split', 'plain');
  CREATE TYPE "public"."enum_pages_blocks_stats_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_stats_source" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_featured_projects_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_features_items_icon" AS ENUM('shield', 'clock', 'layers', 'key', 'globe', 'phone', 'mail', 'pin', 'calendar', 'land', 'floors', 'area', 'bed', 'road', 'car', 'check', 'grid', 'play', 'download', 'heart', 'info');
  CREATE TYPE "public"."enum_pages_blocks_features_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_landowner_band_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_steps_items_icon" AS ENUM('shield', 'clock', 'layers', 'key', 'globe', 'phone', 'mail', 'pin', 'calendar', 'land', 'floors', 'area', 'bed', 'road', 'car', 'check', 'grid', 'play', 'download', 'heart', 'info');
  CREATE TYPE "public"."enum_pages_blocks_steps_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_filter" AS ENUM('all', 'buyer', 'landowner', 'nrb');
  CREATE TYPE "public"."enum_pages_blocks_nrb_banner_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_blog_latest_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_enquiry_form_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_enquiry_form_form" AS ENUM('enquiry', 'siteVisit', 'landowner', 'nrb', 'contact');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_image_text_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_faq_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_blocks_gallery_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('photo', 'split', 'plain');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_source" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_featured_projects_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_features_items_icon" AS ENUM('shield', 'clock', 'layers', 'key', 'globe', 'phone', 'mail', 'pin', 'calendar', 'land', 'floors', 'area', 'bed', 'road', 'car', 'check', 'grid', 'play', 'download', 'heart', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_features_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_landowner_band_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_steps_items_icon" AS ENUM('shield', 'clock', 'layers', 'key', 'globe', 'phone', 'mail', 'pin', 'calendar', 'land', 'floors', 'area', 'bed', 'road', 'car', 'check', 'grid', 'play', 'download', 'heart', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_steps_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_filter" AS ENUM('all', 'buyer', 'landowner', 'nrb');
  CREATE TYPE "public"."enum__pages_v_blocks_nrb_banner_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_latest_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_enquiry_form_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_enquiry_form_form" AS ENUM('enquiry', 'siteVisit', 'landowner', 'nrb', 'contact');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_background" AS ENUM('cream', 'sand', 'ink', 'forest');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'bn');
  CREATE TYPE "public"."enum_projects_nearby_mode" AS ENUM('drive', 'walk');
  CREATE TYPE "public"."enum_projects_sales_status" AS ENUM('ongoing', 'upcoming', 'completed', 'soldOut');
  CREATE TYPE "public"."enum_projects_type" AS ENUM('residential', 'commercial', 'mixed');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_nearby_mode" AS ENUM('drive', 'walk');
  CREATE TYPE "public"."enum__projects_v_version_type" AS ENUM('residential', 'commercial', 'mixed');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('en', 'bn');
  CREATE TYPE "public"."enum_amenities_icon" AS ENUM('shield', 'clock', 'layers', 'key', 'globe', 'phone', 'mail', 'pin', 'calendar', 'land', 'floors', 'area', 'bed', 'road', 'car', 'check', 'grid', 'play', 'download', 'heart', 'info');
  CREATE TYPE "public"."enum_testimonials_type" AS ENUM('buyer', 'landowner', 'nrb');
  CREATE TYPE "public"."enum_posts_category" AS ENUM('buying', 'landowner', 'nrb', 'news');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_category" AS ENUM('buying', 'landowner', 'nrb', 'news');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'bn');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'sales');
  CREATE TYPE "public"."enum_forms_enquiry_hidden_fields" AS ENUM('bedrooms', 'message');
  CREATE TYPE "public"."enum_forms_landowner_hidden_fields" AS ENUM('email', 'plotAddress', 'frontRoadFt', 'documents', 'message');
  CREATE TYPE "public"."enum_forms_nrb_hidden_fields" AS ENUM('project', 'budgetRange', 'bestTimeToCall', 'message');
  CREATE TYPE "public"."enum_forms_contact_hidden_fields" AS ENUM('email');
  CREATE TYPE "public"."enum_popup_trigger" AS ENUM('delay', 'exit');
  CREATE TABLE "leads_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"author_id" integer,
  	"date" timestamp(3) with time zone
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_leads_type" NOT NULL,
  	"segment" "enum_leads_segment",
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"project_id" integer,
  	"message" varchar,
  	"details_bedrooms" varchar,
  	"details_visit_date" timestamp(3) with time zone,
  	"details_time_slot" varchar,
  	"details_area" varchar,
  	"details_plot_address" varchar,
  	"details_land_size_katha" numeric,
  	"details_front_road_ft" numeric,
  	"details_ownership" varchar,
  	"details_country" varchar,
  	"details_whatsapp" varchar,
  	"details_budget_range" varchar,
  	"details_best_time_to_call" varchar,
  	"details_subject" varchar,
  	"tracking_page_url" varchar,
  	"tracking_referrer" varchar,
  	"tracking_utm_source" varchar,
  	"tracking_utm_medium" varchar,
  	"tracking_utm_campaign" varchar,
  	"tracking_utm_content" varchar,
  	"tracking_utm_term" varchar,
  	"tracking_fbclid" varchar,
  	"tracking_gclid" varchar,
  	"tracking_fbp" varchar,
  	"tracking_fbc" varchar,
  	"tracking_language" varchar,
  	"tracking_ip" varchar,
  	"tracking_event_id" varchar,
  	"tracking_user_agent" varchar,
  	"pipeline_email_sent" boolean,
  	"pipeline_sheet_appended" boolean,
  	"pipeline_capi_sent" boolean,
  	"pipeline_errors" varchar,
  	"status" "enum_leads_status" DEFAULT 'new',
  	"assigned_to_id" integer,
  	"duplicate_of_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"lead_files_id" integer
  );
  
  CREATE TABLE "lead_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"original_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_hero_background" DEFAULT 'ink',
  	"anchor_id" varchar,
  	"image_id" integer,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'photo',
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"show_search" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_stats_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"source" "enum_pages_blocks_stats_source" DEFAULT 'site',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_featured_projects_background" DEFAULT 'sand',
  	"anchor_id" varchar,
  	"show_tabs" boolean DEFAULT true,
  	"limit" numeric DEFAULT 3,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_projects_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_features_items_icon" DEFAULT 'check'
  );
  
  CREATE TABLE "pages_blocks_features_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_features_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_features_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_landowner_band_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_landowner_band_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_landowner_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_landowner_band_background" DEFAULT 'forest',
  	"anchor_id" varchar,
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_landowner_band_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_steps_items_icon" DEFAULT 'check'
  );
  
  CREATE TABLE "pages_blocks_steps_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_steps_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_testimonials_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"filter" "enum_pages_blocks_testimonials_filter" DEFAULT 'all',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_nrb_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_nrb_banner_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"image_id" integer,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_nrb_banner_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_blog_latest" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_blog_latest_background" DEFAULT 'sand',
  	"anchor_id" varchar,
  	"limit" numeric DEFAULT 3,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_latest_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_enquiry_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_enquiry_form_background" DEFAULT 'ink',
  	"anchor_id" varchar,
  	"form" "enum_pages_blocks_enquiry_form_form" DEFAULT 'enquiry',
  	"show_contacts" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_enquiry_form_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_rich_text_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"width" "enum_pages_blocks_rich_text_width" DEFAULT 'narrow',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"eyebrow" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_image_text_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_image_text_image_position" DEFAULT 'left',
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_faq_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_cta_band_background" DEFAULT 'ink',
  	"anchor_id" varchar,
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_band_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum_pages_blocks_gallery_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_hero_background" DEFAULT 'ink',
  	"anchor_id" varchar,
  	"image_id" integer,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'photo',
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"show_search" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_stats_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"source" "enum__pages_v_blocks_stats_source" DEFAULT 'site',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_featured_projects_background" DEFAULT 'sand',
  	"anchor_id" varchar,
  	"show_tabs" boolean DEFAULT true,
  	"limit" numeric DEFAULT 3,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_projects_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_features_items_icon" DEFAULT 'check',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_features_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_landowner_band_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_landowner_band_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_landowner_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_landowner_band_background" DEFAULT 'forest',
  	"anchor_id" varchar,
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_landowner_band_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_steps_items_icon" DEFAULT 'check',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steps_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_steps_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steps_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_testimonials_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"filter" "enum__pages_v_blocks_testimonials_filter" DEFAULT 'all',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_nrb_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_nrb_banner_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"image_id" integer,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_nrb_banner_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_blog_latest" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_blog_latest_background" DEFAULT 'sand',
  	"anchor_id" varchar,
  	"limit" numeric DEFAULT 3,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_latest_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_enquiry_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_enquiry_form_background" DEFAULT 'ink',
  	"anchor_id" varchar,
  	"form" "enum__pages_v_blocks_enquiry_form_form" DEFAULT 'enquiry',
  	"show_contacts" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_enquiry_form_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"form_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_rich_text_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"width" "enum__pages_v_blocks_rich_text_width" DEFAULT 'narrow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"eyebrow" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_image_text_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_image_text_image_position" DEFAULT 'left',
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_faq_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_cta_band_background" DEFAULT 'ink',
  	"anchor_id" varchar,
  	"primary_href" varchar,
  	"secondary_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_label" varchar,
  	"secondary_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_gallery_background" DEFAULT 'cream',
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "projects_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "projects_videos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_floor_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size_sft" numeric,
  	"beds" numeric,
  	"baths" numeric,
  	"balconies" numeric,
  	"image_id" integer,
  	"pdf_id" integer
  );
  
  CREATE TABLE "projects_floor_plans_locales" (
  	"name" varchar,
  	"facing" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_nearby" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"minutes" numeric,
  	"mode" "enum_projects_nearby_mode" DEFAULT 'drive'
  );
  
  CREATE TABLE "projects_nearby_locales" (
  	"place" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_progress_updates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone
  );
  
  CREATE TABLE "projects_progress_updates_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_faqs_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_projects_sales_status" DEFAULT 'ongoing',
  	"type" "enum_projects_type" DEFAULT 'residential',
  	"area_id" integer,
  	"facts_land_area_katha" numeric,
  	"facts_floors" varchar,
  	"facts_units" numeric,
  	"facts_size_min_sft" numeric,
  	"facts_size_max_sft" numeric,
  	"facts_bedrooms" varchar,
  	"facts_bathrooms" varchar,
  	"facts_front_road_ft" numeric,
  	"facts_handover_date" timestamp(3) with time zone,
  	"facts_rajuk_no" varchar,
  	"show_price" boolean DEFAULT true,
  	"starting_price" numeric,
  	"brochure_id" integer,
  	"geo_lat" numeric,
  	"geo_lng" numeric,
  	"geo_map_embed_url" varchar,
  	"progress_percent" numeric,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"featured_on_home" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"advisor_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"name" varchar,
  	"address" varchar,
  	"tagline" varchar,
  	"overview" jsonb,
  	"facts_parking" varchar,
  	"price_note" varchar,
  	"progress_stage" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"amenities_id" integer
  );
  
  CREATE TABLE "_projects_v_version_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_videos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_floor_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size_sft" numeric,
  	"beds" numeric,
  	"baths" numeric,
  	"balconies" numeric,
  	"image_id" integer,
  	"pdf_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_floor_plans_locales" (
  	"name" varchar,
  	"facing" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_nearby" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"minutes" numeric,
  	"mode" "enum__projects_v_version_nearby_mode" DEFAULT 'drive',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_nearby_locales" (
  	"place" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_progress_updates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_progress_updates_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_faqs_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_status" "enum_projects_sales_status" DEFAULT 'ongoing',
  	"version_type" "enum__projects_v_version_type" DEFAULT 'residential',
  	"version_area_id" integer,
  	"version_facts_land_area_katha" numeric,
  	"version_facts_floors" varchar,
  	"version_facts_units" numeric,
  	"version_facts_size_min_sft" numeric,
  	"version_facts_size_max_sft" numeric,
  	"version_facts_bedrooms" varchar,
  	"version_facts_bathrooms" varchar,
  	"version_facts_front_road_ft" numeric,
  	"version_facts_handover_date" timestamp(3) with time zone,
  	"version_facts_rajuk_no" varchar,
  	"version_show_price" boolean DEFAULT true,
  	"version_starting_price" numeric,
  	"version_brochure_id" integer,
  	"version_geo_lat" numeric,
  	"version_geo_lng" numeric,
  	"version_geo_map_embed_url" varchar,
  	"version_progress_percent" numeric,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_featured_on_home" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_advisor_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_name" varchar,
  	"version_address" varchar,
  	"version_tagline" varchar,
  	"version_overview" jsonb,
  	"version_facts_parking" varchar,
  	"version_price_note" varchar,
  	"version_progress_stage" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"amenities_id" integer
  );
  
  CREATE TABLE "areas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"hero_image_id" integer,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "areas_locales" (
  	"name" varchar,
  	"intro" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "amenities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum_amenities_icon" DEFAULT 'check',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "amenities_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_testimonials_type" DEFAULT 'buyer' NOT NULL,
  	"project_id" integer,
  	"photo_id" integer,
  	"video_url" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"name" varchar,
  	"role" varchar,
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_id" integer,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"category" "enum_posts_category",
  	"author_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_id" integer,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_category" "enum__posts_v_version_category",
  	"version_author_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"phone" varchar,
  	"whatsapp" varchar,
  	"is_advisor" boolean DEFAULT false,
  	"show_on_about" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_locales" (
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_wide_url" varchar,
  	"sizes_wide_width" numeric,
  	"sizes_wide_height" numeric,
  	"sizes_wide_mime_type" varchar,
  	"sizes_wide_filesize" numeric,
  	"sizes_wide_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"phone" varchar,
  	"active" boolean DEFAULT true,
  	"receives_auto_assign" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"leads_id" integer,
  	"lead_files_id" integer,
  	"pages_id" integer,
  	"projects_id" integer,
  	"areas_id" integer,
  	"amenities_id" integer,
  	"testimonials_id" integer,
  	"posts_id" integer,
  	"team_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "branding" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_light_id" integer,
  	"logo_dark_id" integer,
  	"favicon_id" integer,
  	"og_image_id" integer,
  	"colors_ink" varchar,
  	"colors_forest" varchar,
  	"colors_forest2" varchar,
  	"colors_gold" varchar,
  	"colors_gold_text" varchar,
  	"colors_gold_soft" varchar,
  	"colors_gold_light" varchar,
  	"colors_cream" varchar,
  	"colors_sand" varchar,
  	"colors_text" varchar,
  	"colors_muted" varchar,
  	"colors_line" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "branding_locales" (
  	"company_name" varchar,
  	"tagline" varchar,
  	"logo_subline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"show" boolean DEFAULT true
  );
  
  CREATE TABLE "header_menu_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar,
  	"cta_opens_site_visit" boolean DEFAULT true,
  	"show_hotline" boolean DEFAULT true,
  	"show_language_switch" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"about" varchar,
  	"copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "contact_emails_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hotline" varchar NOT NULL,
  	"whatsapp" varchar NOT NULL,
  	"show_whatsapp_button" boolean DEFAULT true,
  	"map_embed_url" varchar,
  	"socials_facebook" varchar,
  	"socials_instagram" varchar,
  	"socials_youtube" varchar,
  	"socials_linkedin" varchar,
  	"socials_tiktok" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_locales" (
  	"whatsapp_message" varchar,
  	"address" varchar,
  	"office_hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_lead_routing_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"rehab_no" varchar,
  	"trade_licence" varchar,
  	"lead_routing_google_sheet_id" varchar,
  	"lead_routing_google_sheet_tab" varchar DEFAULT 'Leads',
  	"lead_routing_auto_assign" boolean DEFAULT false,
  	"lead_routing_last_assigned_user_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "forms_enquiry_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "forms_enquiry_hidden_fields" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_forms_enquiry_hidden_fields",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "forms_enquiry_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  CREATE TABLE "forms_enquiry_labels_locales" (
  	"label" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_brochure_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "forms_brochure_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  CREATE TABLE "forms_brochure_labels_locales" (
  	"label" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_site_visit_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "forms_site_visit_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  CREATE TABLE "forms_site_visit_labels_locales" (
  	"label" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_landowner_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "forms_landowner_hidden_fields" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_forms_landowner_hidden_fields",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "forms_landowner_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  CREATE TABLE "forms_landowner_labels_locales" (
  	"label" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_nrb_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "forms_nrb_hidden_fields" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_forms_nrb_hidden_fields",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "forms_nrb_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  CREATE TABLE "forms_nrb_labels_locales" (
  	"label" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_contact_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "forms_contact_hidden_fields" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_forms_contact_hidden_fields",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "forms_contact_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  CREATE TABLE "forms_contact_labels_locales" (
  	"label" varchar,
  	"placeholder" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_bedrooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_bedrooms_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_time_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_time_slots_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_budget_ranges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_budget_ranges_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_best_times" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_best_times_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_subjects_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "forms_locales" (
  	"enquiry_title" varchar,
  	"enquiry_submit_label" varchar,
  	"enquiry_success_message" varchar,
  	"brochure_title" varchar,
  	"brochure_submit_label" varchar,
  	"brochure_success_message" varchar,
  	"site_visit_title" varchar,
  	"site_visit_submit_label" varchar,
  	"site_visit_success_message" varchar,
  	"landowner_title" varchar,
  	"landowner_submit_label" varchar,
  	"landowner_success_message" varchar,
  	"nrb_title" varchar,
  	"nrb_submit_label" varchar,
  	"nrb_success_message" varchar,
  	"contact_title" varchar,
  	"contact_submit_label" varchar,
  	"contact_success_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "seo_redirects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"permanent" boolean DEFAULT true
  );
  
  CREATE TABLE "seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_template" varchar DEFAULT '%s · NR Property',
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_locales" (
  	"default_title" varchar,
  	"default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tracking" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gtm_id" varchar,
  	"ga4_id" varchar,
  	"clarity_id" varchar,
  	"meta_pixel_id" varchar,
  	"meta_test_event_code" varchar,
  	"meta_capi_token" varchar,
  	"google_ads_conversion_id" varchar,
  	"google_ads_labels_lead" varchar,
  	"google_ads_labels_schedule" varchar,
  	"google_ads_labels_landowner" varchar,
  	"google_ads_labels_contact" varchar,
  	"consent_required" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcement" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcement_locales" (
  	"text" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "popup" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"image_id" integer,
  	"trigger" "enum_popup_trigger" DEFAULT 'delay',
  	"delay_seconds" numeric DEFAULT 20,
  	"show_form" boolean DEFAULT true,
  	"href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "popup_locales" (
  	"title" varchar,
  	"body" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "popup_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "leads_notes" ADD CONSTRAINT "leads_notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads_notes" ADD CONSTRAINT "leads_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_duplicate_of_id_leads_id_fk" FOREIGN KEY ("duplicate_of_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads_rels" ADD CONSTRAINT "leads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leads_rels" ADD CONSTRAINT "leads_rels_lead_files_fk" FOREIGN KEY ("lead_files_id") REFERENCES "public"."lead_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items" ADD CONSTRAINT "pages_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_items_locales" ADD CONSTRAINT "pages_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_projects" ADD CONSTRAINT "pages_blocks_featured_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_projects_locales" ADD CONSTRAINT "pages_blocks_featured_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_items_locales" ADD CONSTRAINT "pages_blocks_features_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_locales" ADD CONSTRAINT "pages_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landowner_band_steps" ADD CONSTRAINT "pages_blocks_landowner_band_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landowner_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landowner_band_steps_locales" ADD CONSTRAINT "pages_blocks_landowner_band_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landowner_band_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landowner_band" ADD CONSTRAINT "pages_blocks_landowner_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landowner_band_locales" ADD CONSTRAINT "pages_blocks_landowner_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landowner_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items" ADD CONSTRAINT "pages_blocks_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items_locales" ADD CONSTRAINT "pages_blocks_steps_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps" ADD CONSTRAINT "pages_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_locales" ADD CONSTRAINT "pages_blocks_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_nrb_banner" ADD CONSTRAINT "pages_blocks_nrb_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_nrb_banner" ADD CONSTRAINT "pages_blocks_nrb_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_nrb_banner_locales" ADD CONSTRAINT "pages_blocks_nrb_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_nrb_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_latest" ADD CONSTRAINT "pages_blocks_blog_latest_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_latest_locales" ADD CONSTRAINT "pages_blocks_blog_latest_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog_latest"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_enquiry_form" ADD CONSTRAINT "pages_blocks_enquiry_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_enquiry_form_locales" ADD CONSTRAINT "pages_blocks_enquiry_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_enquiry_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_locales" ADD CONSTRAINT "pages_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band_locales" ADD CONSTRAINT "pages_blocks_cta_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items" ADD CONSTRAINT "_pages_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_items_locales" ADD CONSTRAINT "_pages_v_blocks_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_projects" ADD CONSTRAINT "_pages_v_blocks_featured_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_projects_locales" ADD CONSTRAINT "_pages_v_blocks_featured_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_featured_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items_locales" ADD CONSTRAINT "_pages_v_blocks_features_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_locales" ADD CONSTRAINT "_pages_v_blocks_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_landowner_band_steps" ADD CONSTRAINT "_pages_v_blocks_landowner_band_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_landowner_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_landowner_band_steps_locales" ADD CONSTRAINT "_pages_v_blocks_landowner_band_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_landowner_band_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_landowner_band" ADD CONSTRAINT "_pages_v_blocks_landowner_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_landowner_band_locales" ADD CONSTRAINT "_pages_v_blocks_landowner_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_landowner_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps_items" ADD CONSTRAINT "_pages_v_blocks_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps_items_locales" ADD CONSTRAINT "_pages_v_blocks_steps_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps" ADD CONSTRAINT "_pages_v_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps_locales" ADD CONSTRAINT "_pages_v_blocks_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_nrb_banner" ADD CONSTRAINT "_pages_v_blocks_nrb_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_nrb_banner" ADD CONSTRAINT "_pages_v_blocks_nrb_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_nrb_banner_locales" ADD CONSTRAINT "_pages_v_blocks_nrb_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_nrb_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_latest" ADD CONSTRAINT "_pages_v_blocks_blog_latest_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_latest_locales" ADD CONSTRAINT "_pages_v_blocks_blog_latest_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_blog_latest"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enquiry_form" ADD CONSTRAINT "_pages_v_blocks_enquiry_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enquiry_form_locales" ADD CONSTRAINT "_pages_v_blocks_enquiry_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_enquiry_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_locales" ADD CONSTRAINT "_pages_v_blocks_image_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band" ADD CONSTRAINT "_pages_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band_locales" ADD CONSTRAINT "_pages_v_blocks_cta_band_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_videos" ADD CONSTRAINT "projects_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_videos_locales" ADD CONSTRAINT "projects_videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_floor_plans" ADD CONSTRAINT "projects_floor_plans_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_floor_plans" ADD CONSTRAINT "projects_floor_plans_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_floor_plans" ADD CONSTRAINT "projects_floor_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_floor_plans_locales" ADD CONSTRAINT "projects_floor_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_floor_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_nearby" ADD CONSTRAINT "projects_nearby_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_nearby_locales" ADD CONSTRAINT "projects_nearby_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_nearby"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_progress_updates" ADD CONSTRAINT "projects_progress_updates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_progress_updates_locales" ADD CONSTRAINT "projects_progress_updates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_progress_updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_faqs" ADD CONSTRAINT "projects_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_faqs_locales" ADD CONSTRAINT "projects_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_area_id_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_brochure_id_media_id_fk" FOREIGN KEY ("brochure_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_advisor_id_team_id_fk" FOREIGN KEY ("advisor_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_videos" ADD CONSTRAINT "_projects_v_version_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_videos_locales" ADD CONSTRAINT "_projects_v_version_videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_floor_plans" ADD CONSTRAINT "_projects_v_version_floor_plans_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_floor_plans" ADD CONSTRAINT "_projects_v_version_floor_plans_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_floor_plans" ADD CONSTRAINT "_projects_v_version_floor_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_floor_plans_locales" ADD CONSTRAINT "_projects_v_version_floor_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_floor_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_nearby" ADD CONSTRAINT "_projects_v_version_nearby_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_nearby_locales" ADD CONSTRAINT "_projects_v_version_nearby_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_nearby"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_progress_updates" ADD CONSTRAINT "_projects_v_version_progress_updates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_progress_updates_locales" ADD CONSTRAINT "_projects_v_version_progress_updates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_progress_updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_faqs" ADD CONSTRAINT "_projects_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_faqs_locales" ADD CONSTRAINT "_projects_v_version_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_area_id_areas_id_fk" FOREIGN KEY ("version_area_id") REFERENCES "public"."areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_brochure_id_media_id_fk" FOREIGN KEY ("version_brochure_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_advisor_id_team_id_fk" FOREIGN KEY ("version_advisor_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "areas" ADD CONSTRAINT "areas_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "areas" ADD CONSTRAINT "areas_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "areas_locales" ADD CONSTRAINT "areas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "amenities_locales" ADD CONSTRAINT "amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_team_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_team_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_locales" ADD CONSTRAINT "team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lead_files_fk" FOREIGN KEY ("lead_files_id") REFERENCES "public"."lead_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_areas_fk" FOREIGN KEY ("areas_id") REFERENCES "public"."areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_amenities_fk" FOREIGN KEY ("amenities_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding_locales" ADD CONSTRAINT "branding_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."branding"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_menu" ADD CONSTRAINT "header_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_menu_locales" ADD CONSTRAINT "header_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_emails" ADD CONSTRAINT "contact_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_emails_locales" ADD CONSTRAINT "contact_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_locales" ADD CONSTRAINT "contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_stats" ADD CONSTRAINT "site_settings_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_stats_locales" ADD CONSTRAINT "site_settings_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_lead_routing_recipients" ADD CONSTRAINT "site_settings_lead_routing_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_lead_routing_last_assigned_user_id_users_id_fk" FOREIGN KEY ("lead_routing_last_assigned_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_enquiry_recipients" ADD CONSTRAINT "forms_enquiry_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_enquiry_hidden_fields" ADD CONSTRAINT "forms_enquiry_hidden_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_enquiry_labels" ADD CONSTRAINT "forms_enquiry_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_enquiry_labels_locales" ADD CONSTRAINT "forms_enquiry_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_enquiry_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_brochure_recipients" ADD CONSTRAINT "forms_brochure_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_brochure_labels" ADD CONSTRAINT "forms_brochure_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_brochure_labels_locales" ADD CONSTRAINT "forms_brochure_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_brochure_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_site_visit_recipients" ADD CONSTRAINT "forms_site_visit_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_site_visit_labels" ADD CONSTRAINT "forms_site_visit_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_site_visit_labels_locales" ADD CONSTRAINT "forms_site_visit_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_site_visit_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_landowner_recipients" ADD CONSTRAINT "forms_landowner_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_landowner_hidden_fields" ADD CONSTRAINT "forms_landowner_hidden_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_landowner_labels" ADD CONSTRAINT "forms_landowner_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_landowner_labels_locales" ADD CONSTRAINT "forms_landowner_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_landowner_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_nrb_recipients" ADD CONSTRAINT "forms_nrb_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_nrb_hidden_fields" ADD CONSTRAINT "forms_nrb_hidden_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_nrb_labels" ADD CONSTRAINT "forms_nrb_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_nrb_labels_locales" ADD CONSTRAINT "forms_nrb_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_nrb_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_contact_recipients" ADD CONSTRAINT "forms_contact_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_contact_hidden_fields" ADD CONSTRAINT "forms_contact_hidden_fields_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_contact_labels" ADD CONSTRAINT "forms_contact_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_contact_labels_locales" ADD CONSTRAINT "forms_contact_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_contact_labels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_bedrooms" ADD CONSTRAINT "forms_bedrooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_bedrooms_locales" ADD CONSTRAINT "forms_bedrooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_bedrooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_time_slots" ADD CONSTRAINT "forms_time_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_time_slots_locales" ADD CONSTRAINT "forms_time_slots_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_time_slots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_budget_ranges" ADD CONSTRAINT "forms_budget_ranges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_budget_ranges_locales" ADD CONSTRAINT "forms_budget_ranges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_budget_ranges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_best_times" ADD CONSTRAINT "forms_best_times_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_best_times_locales" ADD CONSTRAINT "forms_best_times_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_best_times"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_subjects" ADD CONSTRAINT "forms_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_subjects_locales" ADD CONSTRAINT "forms_subjects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_subjects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_redirects" ADD CONSTRAINT "seo_redirects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo" ADD CONSTRAINT "seo_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_locales" ADD CONSTRAINT "seo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_locales" ADD CONSTRAINT "announcement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "popup" ADD CONSTRAINT "popup_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "popup_locales" ADD CONSTRAINT "popup_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."popup"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "popup_texts" ADD CONSTRAINT "popup_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."popup"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "leads_notes_order_idx" ON "leads_notes" USING btree ("_order");
  CREATE INDEX "leads_notes_parent_id_idx" ON "leads_notes" USING btree ("_parent_id");
  CREATE INDEX "leads_notes_author_idx" ON "leads_notes" USING btree ("author_id");
  CREATE INDEX "leads_segment_idx" ON "leads" USING btree ("segment");
  CREATE INDEX "leads_phone_idx" ON "leads" USING btree ("phone");
  CREATE INDEX "leads_project_idx" ON "leads" USING btree ("project_id");
  CREATE INDEX "leads_tracking_tracking_utm_source_idx" ON "leads" USING btree ("tracking_utm_source");
  CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");
  CREATE INDEX "leads_assigned_to_idx" ON "leads" USING btree ("assigned_to_id");
  CREATE INDEX "leads_duplicate_of_idx" ON "leads" USING btree ("duplicate_of_id");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "leads_rels_order_idx" ON "leads_rels" USING btree ("order");
  CREATE INDEX "leads_rels_parent_idx" ON "leads_rels" USING btree ("parent_id");
  CREATE INDEX "leads_rels_path_idx" ON "leads_rels" USING btree ("path");
  CREATE INDEX "leads_rels_lead_files_id_idx" ON "leads_rels" USING btree ("lead_files_id");
  CREATE INDEX "lead_files_updated_at_idx" ON "lead_files" USING btree ("updated_at");
  CREATE INDEX "lead_files_created_at_idx" ON "lead_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "lead_files_filename_idx" ON "lead_files" USING btree ("filename");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locales_parent_id_idx" ON "pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_items_order_idx" ON "pages_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_items_parent_id_idx" ON "pages_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_items_locales_locale_parent_id_unique" ON "pages_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_items_locales_parent_id_idx" ON "pages_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_projects_order_idx" ON "pages_blocks_featured_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_projects_parent_id_idx" ON "pages_blocks_featured_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_projects_path_idx" ON "pages_blocks_featured_projects" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_featured_projects_locales_locale_parent_id_uniq" ON "pages_blocks_featured_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_featured_projects_locales_parent_id_idx" ON "pages_blocks_featured_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_items_order_idx" ON "pages_blocks_features_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_items_parent_id_idx" ON "pages_blocks_features_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_features_items_locales_locale_parent_id_unique" ON "pages_blocks_features_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_features_items_locales_parent_id_idx" ON "pages_blocks_features_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_features_image_idx" ON "pages_blocks_features" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_features_locales_locale_parent_id_unique" ON "pages_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_features_locales_parent_id_idx" ON "pages_blocks_features_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landowner_band_steps_order_idx" ON "pages_blocks_landowner_band_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_landowner_band_steps_parent_id_idx" ON "pages_blocks_landowner_band_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_landowner_band_steps_locales_locale_parent_id_u" ON "pages_blocks_landowner_band_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_landowner_band_steps_locales_parent_id_idx" ON "pages_blocks_landowner_band_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landowner_band_order_idx" ON "pages_blocks_landowner_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_landowner_band_parent_id_idx" ON "pages_blocks_landowner_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landowner_band_path_idx" ON "pages_blocks_landowner_band" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_landowner_band_locales_locale_parent_id_unique" ON "pages_blocks_landowner_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_landowner_band_locales_parent_id_idx" ON "pages_blocks_landowner_band_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_items_order_idx" ON "pages_blocks_steps_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_items_parent_id_idx" ON "pages_blocks_steps_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_steps_items_locales_locale_parent_id_unique" ON "pages_blocks_steps_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_steps_items_locales_parent_id_idx" ON "pages_blocks_steps_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_order_idx" ON "pages_blocks_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_parent_id_idx" ON "pages_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_path_idx" ON "pages_blocks_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_steps_locales_locale_parent_id_unique" ON "pages_blocks_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_steps_locales_parent_id_idx" ON "pages_blocks_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_locales_parent_id_idx" ON "pages_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_nrb_banner_order_idx" ON "pages_blocks_nrb_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_nrb_banner_parent_id_idx" ON "pages_blocks_nrb_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_nrb_banner_path_idx" ON "pages_blocks_nrb_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_nrb_banner_image_idx" ON "pages_blocks_nrb_banner" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_nrb_banner_locales_locale_parent_id_unique" ON "pages_blocks_nrb_banner_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_nrb_banner_locales_parent_id_idx" ON "pages_blocks_nrb_banner_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_latest_order_idx" ON "pages_blocks_blog_latest" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_latest_parent_id_idx" ON "pages_blocks_blog_latest" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_latest_path_idx" ON "pages_blocks_blog_latest" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_blog_latest_locales_locale_parent_id_unique" ON "pages_blocks_blog_latest_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_blog_latest_locales_parent_id_idx" ON "pages_blocks_blog_latest_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_enquiry_form_order_idx" ON "pages_blocks_enquiry_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_enquiry_form_parent_id_idx" ON "pages_blocks_enquiry_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_enquiry_form_path_idx" ON "pages_blocks_enquiry_form" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_enquiry_form_locales_locale_parent_id_unique" ON "pages_blocks_enquiry_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_enquiry_form_locales_parent_id_idx" ON "pages_blocks_enquiry_form_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_locales_parent_id_idx" ON "pages_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_image_text_locales_locale_parent_id_unique" ON "pages_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_text_locales_parent_id_idx" ON "pages_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locales_parent_id_idx" ON "pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_band_locales_locale_parent_id_unique" ON "pages_blocks_cta_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_band_locales_parent_id_idx" ON "pages_blocks_cta_band_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_locales_parent_id_idx" ON "pages_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_locales_parent_id_idx" ON "_pages_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_order_idx" ON "_pages_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_items_parent_id_idx" ON "_pages_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_stats_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_items_locales_parent_id_idx" ON "_pages_v_blocks_stats_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_projects_order_idx" ON "_pages_v_blocks_featured_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_projects_parent_id_idx" ON "_pages_v_blocks_featured_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_projects_path_idx" ON "_pages_v_blocks_featured_projects" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_featured_projects_locales_locale_parent_id_u" ON "_pages_v_blocks_featured_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_projects_locales_parent_id_idx" ON "_pages_v_blocks_featured_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_items_order_idx" ON "_pages_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_items_parent_id_idx" ON "_pages_v_blocks_features_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_items_locales_locale_parent_id_uniq" ON "_pages_v_blocks_features_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_features_items_locales_parent_id_idx" ON "_pages_v_blocks_features_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_features_image_idx" ON "_pages_v_blocks_features" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_features_locales_locale_parent_id_unique" ON "_pages_v_blocks_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_features_locales_parent_id_idx" ON "_pages_v_blocks_features_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_landowner_band_steps_order_idx" ON "_pages_v_blocks_landowner_band_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_landowner_band_steps_parent_id_idx" ON "_pages_v_blocks_landowner_band_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_landowner_band_steps_locales_locale_parent_i" ON "_pages_v_blocks_landowner_band_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_landowner_band_steps_locales_parent_id_idx" ON "_pages_v_blocks_landowner_band_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_landowner_band_order_idx" ON "_pages_v_blocks_landowner_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_landowner_band_parent_id_idx" ON "_pages_v_blocks_landowner_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_landowner_band_path_idx" ON "_pages_v_blocks_landowner_band" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_landowner_band_locales_locale_parent_id_uniq" ON "_pages_v_blocks_landowner_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_landowner_band_locales_parent_id_idx" ON "_pages_v_blocks_landowner_band_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_items_order_idx" ON "_pages_v_blocks_steps_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steps_items_parent_id_idx" ON "_pages_v_blocks_steps_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_steps_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_steps_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_items_locales_parent_id_idx" ON "_pages_v_blocks_steps_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_order_idx" ON "_pages_v_blocks_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steps_parent_id_idx" ON "_pages_v_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_path_idx" ON "_pages_v_blocks_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_steps_locales_locale_parent_id_unique" ON "_pages_v_blocks_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_locales_parent_id_idx" ON "_pages_v_blocks_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_locales_parent_id_idx" ON "_pages_v_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_nrb_banner_order_idx" ON "_pages_v_blocks_nrb_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_nrb_banner_parent_id_idx" ON "_pages_v_blocks_nrb_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_nrb_banner_path_idx" ON "_pages_v_blocks_nrb_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_nrb_banner_image_idx" ON "_pages_v_blocks_nrb_banner" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_nrb_banner_locales_locale_parent_id_unique" ON "_pages_v_blocks_nrb_banner_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_nrb_banner_locales_parent_id_idx" ON "_pages_v_blocks_nrb_banner_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_latest_order_idx" ON "_pages_v_blocks_blog_latest" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_latest_parent_id_idx" ON "_pages_v_blocks_blog_latest" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_latest_path_idx" ON "_pages_v_blocks_blog_latest" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_blog_latest_locales_locale_parent_id_unique" ON "_pages_v_blocks_blog_latest_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_latest_locales_parent_id_idx" ON "_pages_v_blocks_blog_latest_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_enquiry_form_order_idx" ON "_pages_v_blocks_enquiry_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_enquiry_form_parent_id_idx" ON "_pages_v_blocks_enquiry_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_enquiry_form_path_idx" ON "_pages_v_blocks_enquiry_form" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_enquiry_form_locales_locale_parent_id_unique" ON "_pages_v_blocks_enquiry_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_enquiry_form_locales_parent_id_idx" ON "_pages_v_blocks_enquiry_form_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_locales_parent_id_idx" ON "_pages_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_image_idx" ON "_pages_v_blocks_image_text" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_image_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_locales_parent_id_idx" ON "_pages_v_blocks_image_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locales_parent_id_idx" ON "_pages_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_locales_parent_id_idx" ON "_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_order_idx" ON "_pages_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_parent_id_idx" ON "_pages_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_path_idx" ON "_pages_v_blocks_cta_band" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_band_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_band_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_locales_parent_id_idx" ON "_pages_v_blocks_cta_band_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_locales_locale_parent_id_unique" ON "_pages_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_locales_parent_id_idx" ON "_pages_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "projects_videos_order_idx" ON "projects_videos" USING btree ("_order");
  CREATE INDEX "projects_videos_parent_id_idx" ON "projects_videos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_videos_locales_locale_parent_id_unique" ON "projects_videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_videos_locales_parent_id_idx" ON "projects_videos_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_floor_plans_order_idx" ON "projects_floor_plans" USING btree ("_order");
  CREATE INDEX "projects_floor_plans_parent_id_idx" ON "projects_floor_plans" USING btree ("_parent_id");
  CREATE INDEX "projects_floor_plans_image_idx" ON "projects_floor_plans" USING btree ("image_id");
  CREATE INDEX "projects_floor_plans_pdf_idx" ON "projects_floor_plans" USING btree ("pdf_id");
  CREATE UNIQUE INDEX "projects_floor_plans_locales_locale_parent_id_unique" ON "projects_floor_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_floor_plans_locales_parent_id_idx" ON "projects_floor_plans_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_nearby_order_idx" ON "projects_nearby" USING btree ("_order");
  CREATE INDEX "projects_nearby_parent_id_idx" ON "projects_nearby" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_nearby_locales_locale_parent_id_unique" ON "projects_nearby_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_nearby_locales_parent_id_idx" ON "projects_nearby_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_progress_updates_order_idx" ON "projects_progress_updates" USING btree ("_order");
  CREATE INDEX "projects_progress_updates_parent_id_idx" ON "projects_progress_updates" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_progress_updates_locales_locale_parent_id_unique" ON "projects_progress_updates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_progress_updates_locales_parent_id_idx" ON "projects_progress_updates_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_faqs_order_idx" ON "projects_faqs" USING btree ("_order");
  CREATE INDEX "projects_faqs_parent_id_idx" ON "projects_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_faqs_locales_locale_parent_id_unique" ON "projects_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_faqs_locales_parent_id_idx" ON "projects_faqs_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_area_idx" ON "projects" USING btree ("area_id");
  CREATE INDEX "projects_brochure_idx" ON "projects" USING btree ("brochure_id");
  CREATE INDEX "projects_seo_seo_og_image_idx" ON "projects" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_advisor_idx" ON "projects" USING btree ("advisor_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "projects_rels_amenities_id_idx" ON "projects_rels" USING btree ("amenities_id");
  CREATE INDEX "_projects_v_version_videos_order_idx" ON "_projects_v_version_videos" USING btree ("_order");
  CREATE INDEX "_projects_v_version_videos_parent_id_idx" ON "_projects_v_version_videos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_videos_locales_locale_parent_id_unique" ON "_projects_v_version_videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_videos_locales_parent_id_idx" ON "_projects_v_version_videos_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_floor_plans_order_idx" ON "_projects_v_version_floor_plans" USING btree ("_order");
  CREATE INDEX "_projects_v_version_floor_plans_parent_id_idx" ON "_projects_v_version_floor_plans" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_floor_plans_image_idx" ON "_projects_v_version_floor_plans" USING btree ("image_id");
  CREATE INDEX "_projects_v_version_floor_plans_pdf_idx" ON "_projects_v_version_floor_plans" USING btree ("pdf_id");
  CREATE UNIQUE INDEX "_projects_v_version_floor_plans_locales_locale_parent_id_uni" ON "_projects_v_version_floor_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_floor_plans_locales_parent_id_idx" ON "_projects_v_version_floor_plans_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_nearby_order_idx" ON "_projects_v_version_nearby" USING btree ("_order");
  CREATE INDEX "_projects_v_version_nearby_parent_id_idx" ON "_projects_v_version_nearby" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_nearby_locales_locale_parent_id_unique" ON "_projects_v_version_nearby_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_nearby_locales_parent_id_idx" ON "_projects_v_version_nearby_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_progress_updates_order_idx" ON "_projects_v_version_progress_updates" USING btree ("_order");
  CREATE INDEX "_projects_v_version_progress_updates_parent_id_idx" ON "_projects_v_version_progress_updates" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_progress_updates_locales_locale_parent_i" ON "_projects_v_version_progress_updates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_progress_updates_locales_parent_id_idx" ON "_projects_v_version_progress_updates_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_faqs_order_idx" ON "_projects_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_projects_v_version_faqs_parent_id_idx" ON "_projects_v_version_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_faqs_locales_locale_parent_id_unique" ON "_projects_v_version_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_faqs_locales_parent_id_idx" ON "_projects_v_version_faqs_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_area_idx" ON "_projects_v" USING btree ("version_area_id");
  CREATE INDEX "_projects_v_version_version_brochure_idx" ON "_projects_v" USING btree ("version_brochure_id");
  CREATE INDEX "_projects_v_version_seo_version_seo_og_image_idx" ON "_projects_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_advisor_idx" ON "_projects_v" USING btree ("version_advisor_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_locales_parent_id_idx" ON "_projects_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_rels_amenities_id_idx" ON "_projects_v_rels" USING btree ("amenities_id");
  CREATE UNIQUE INDEX "areas_slug_idx" ON "areas" USING btree ("slug");
  CREATE INDEX "areas_hero_image_idx" ON "areas" USING btree ("hero_image_id");
  CREATE INDEX "areas_seo_seo_og_image_idx" ON "areas" USING btree ("seo_og_image_id");
  CREATE INDEX "areas_updated_at_idx" ON "areas" USING btree ("updated_at");
  CREATE INDEX "areas_created_at_idx" ON "areas" USING btree ("created_at");
  CREATE UNIQUE INDEX "areas_locales_locale_parent_id_unique" ON "areas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "areas_locales_parent_id_idx" ON "areas_locales" USING btree ("_parent_id");
  CREATE INDEX "amenities_updated_at_idx" ON "amenities" USING btree ("updated_at");
  CREATE INDEX "amenities_created_at_idx" ON "amenities" USING btree ("created_at");
  CREATE UNIQUE INDEX "amenities_locales_locale_parent_id_unique" ON "amenities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "amenities_locales_parent_id_idx" ON "amenities_locales" USING btree ("_parent_id");
  CREATE INDEX "testimonials_project_idx" ON "testimonials" USING btree ("project_id");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_locales_parent_id_idx" ON "testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_cover_idx" ON "posts" USING btree ("cover_id");
  CREATE INDEX "posts_seo_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_locales_parent_id_idx" ON "posts_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_projects_id_idx" ON "posts_rels" USING btree ("projects_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_cover_idx" ON "_posts_v" USING btree ("version_cover_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_og_image_idx" ON "_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_locales_parent_id_idx" ON "_posts_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_projects_id_idx" ON "_posts_v_rels" USING btree ("projects_id");
  CREATE INDEX "team_photo_idx" ON "team" USING btree ("photo_id");
  CREATE INDEX "team_updated_at_idx" ON "team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "team" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_locales_locale_parent_id_unique" ON "team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_locales_parent_id_idx" ON "team_locales" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_wide_sizes_wide_filename_idx" ON "media" USING btree ("sizes_wide_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_lead_files_id_idx" ON "payload_locked_documents_rels" USING btree ("lead_files_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("areas_id");
  CREATE INDEX "payload_locked_documents_rels_amenities_id_idx" ON "payload_locked_documents_rels" USING btree ("amenities_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "branding_logo_light_idx" ON "branding" USING btree ("logo_light_id");
  CREATE INDEX "branding_logo_dark_idx" ON "branding" USING btree ("logo_dark_id");
  CREATE INDEX "branding_favicon_idx" ON "branding" USING btree ("favicon_id");
  CREATE INDEX "branding_og_image_idx" ON "branding" USING btree ("og_image_id");
  CREATE UNIQUE INDEX "branding_locales_locale_parent_id_unique" ON "branding_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "branding_locales_parent_id_idx" ON "branding_locales" USING btree ("_parent_id");
  CREATE INDEX "header_menu_order_idx" ON "header_menu" USING btree ("_order");
  CREATE INDEX "header_menu_parent_id_idx" ON "header_menu" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_menu_locales_locale_parent_id_unique" ON "header_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_menu_locales_parent_id_idx" ON "header_menu_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_locales_parent_id_idx" ON "header_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_locales_parent_id_idx" ON "footer_columns_links_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_locales_parent_id_idx" ON "footer_columns_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_locales_parent_id_idx" ON "footer_locales" USING btree ("_parent_id");
  CREATE INDEX "contact_emails_order_idx" ON "contact_emails" USING btree ("_order");
  CREATE INDEX "contact_emails_parent_id_idx" ON "contact_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_emails_locales_locale_parent_id_unique" ON "contact_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_emails_locales_parent_id_idx" ON "contact_emails_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_locales_locale_parent_id_unique" ON "contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_locales_parent_id_idx" ON "contact_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_stats_order_idx" ON "site_settings_stats" USING btree ("_order");
  CREATE INDEX "site_settings_stats_parent_id_idx" ON "site_settings_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_stats_locales_locale_parent_id_unique" ON "site_settings_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_stats_locales_parent_id_idx" ON "site_settings_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_lead_routing_recipients_order_idx" ON "site_settings_lead_routing_recipients" USING btree ("_order");
  CREATE INDEX "site_settings_lead_routing_recipients_parent_id_idx" ON "site_settings_lead_routing_recipients" USING btree ("_parent_id");
  CREATE INDEX "site_settings_lead_routing_lead_routing_last_assigned_us_idx" ON "site_settings" USING btree ("lead_routing_last_assigned_user_id");
  CREATE INDEX "forms_enquiry_recipients_order_idx" ON "forms_enquiry_recipients" USING btree ("_order");
  CREATE INDEX "forms_enquiry_recipients_parent_id_idx" ON "forms_enquiry_recipients" USING btree ("_parent_id");
  CREATE INDEX "forms_enquiry_hidden_fields_order_idx" ON "forms_enquiry_hidden_fields" USING btree ("order");
  CREATE INDEX "forms_enquiry_hidden_fields_parent_idx" ON "forms_enquiry_hidden_fields" USING btree ("parent_id");
  CREATE INDEX "forms_enquiry_labels_order_idx" ON "forms_enquiry_labels" USING btree ("_order");
  CREATE INDEX "forms_enquiry_labels_parent_id_idx" ON "forms_enquiry_labels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_enquiry_labels_locales_locale_parent_id_unique" ON "forms_enquiry_labels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_enquiry_labels_locales_parent_id_idx" ON "forms_enquiry_labels_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_brochure_recipients_order_idx" ON "forms_brochure_recipients" USING btree ("_order");
  CREATE INDEX "forms_brochure_recipients_parent_id_idx" ON "forms_brochure_recipients" USING btree ("_parent_id");
  CREATE INDEX "forms_brochure_labels_order_idx" ON "forms_brochure_labels" USING btree ("_order");
  CREATE INDEX "forms_brochure_labels_parent_id_idx" ON "forms_brochure_labels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_brochure_labels_locales_locale_parent_id_unique" ON "forms_brochure_labels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_brochure_labels_locales_parent_id_idx" ON "forms_brochure_labels_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_site_visit_recipients_order_idx" ON "forms_site_visit_recipients" USING btree ("_order");
  CREATE INDEX "forms_site_visit_recipients_parent_id_idx" ON "forms_site_visit_recipients" USING btree ("_parent_id");
  CREATE INDEX "forms_site_visit_labels_order_idx" ON "forms_site_visit_labels" USING btree ("_order");
  CREATE INDEX "forms_site_visit_labels_parent_id_idx" ON "forms_site_visit_labels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_site_visit_labels_locales_locale_parent_id_unique" ON "forms_site_visit_labels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_site_visit_labels_locales_parent_id_idx" ON "forms_site_visit_labels_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_landowner_recipients_order_idx" ON "forms_landowner_recipients" USING btree ("_order");
  CREATE INDEX "forms_landowner_recipients_parent_id_idx" ON "forms_landowner_recipients" USING btree ("_parent_id");
  CREATE INDEX "forms_landowner_hidden_fields_order_idx" ON "forms_landowner_hidden_fields" USING btree ("order");
  CREATE INDEX "forms_landowner_hidden_fields_parent_idx" ON "forms_landowner_hidden_fields" USING btree ("parent_id");
  CREATE INDEX "forms_landowner_labels_order_idx" ON "forms_landowner_labels" USING btree ("_order");
  CREATE INDEX "forms_landowner_labels_parent_id_idx" ON "forms_landowner_labels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_landowner_labels_locales_locale_parent_id_unique" ON "forms_landowner_labels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_landowner_labels_locales_parent_id_idx" ON "forms_landowner_labels_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_nrb_recipients_order_idx" ON "forms_nrb_recipients" USING btree ("_order");
  CREATE INDEX "forms_nrb_recipients_parent_id_idx" ON "forms_nrb_recipients" USING btree ("_parent_id");
  CREATE INDEX "forms_nrb_hidden_fields_order_idx" ON "forms_nrb_hidden_fields" USING btree ("order");
  CREATE INDEX "forms_nrb_hidden_fields_parent_idx" ON "forms_nrb_hidden_fields" USING btree ("parent_id");
  CREATE INDEX "forms_nrb_labels_order_idx" ON "forms_nrb_labels" USING btree ("_order");
  CREATE INDEX "forms_nrb_labels_parent_id_idx" ON "forms_nrb_labels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_nrb_labels_locales_locale_parent_id_unique" ON "forms_nrb_labels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_nrb_labels_locales_parent_id_idx" ON "forms_nrb_labels_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_contact_recipients_order_idx" ON "forms_contact_recipients" USING btree ("_order");
  CREATE INDEX "forms_contact_recipients_parent_id_idx" ON "forms_contact_recipients" USING btree ("_parent_id");
  CREATE INDEX "forms_contact_hidden_fields_order_idx" ON "forms_contact_hidden_fields" USING btree ("order");
  CREATE INDEX "forms_contact_hidden_fields_parent_idx" ON "forms_contact_hidden_fields" USING btree ("parent_id");
  CREATE INDEX "forms_contact_labels_order_idx" ON "forms_contact_labels" USING btree ("_order");
  CREATE INDEX "forms_contact_labels_parent_id_idx" ON "forms_contact_labels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_contact_labels_locales_locale_parent_id_unique" ON "forms_contact_labels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_contact_labels_locales_parent_id_idx" ON "forms_contact_labels_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_bedrooms_order_idx" ON "forms_bedrooms" USING btree ("_order");
  CREATE INDEX "forms_bedrooms_parent_id_idx" ON "forms_bedrooms" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_bedrooms_locales_locale_parent_id_unique" ON "forms_bedrooms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_bedrooms_locales_parent_id_idx" ON "forms_bedrooms_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_time_slots_order_idx" ON "forms_time_slots" USING btree ("_order");
  CREATE INDEX "forms_time_slots_parent_id_idx" ON "forms_time_slots" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_time_slots_locales_locale_parent_id_unique" ON "forms_time_slots_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_time_slots_locales_parent_id_idx" ON "forms_time_slots_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_budget_ranges_order_idx" ON "forms_budget_ranges" USING btree ("_order");
  CREATE INDEX "forms_budget_ranges_parent_id_idx" ON "forms_budget_ranges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_budget_ranges_locales_locale_parent_id_unique" ON "forms_budget_ranges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_budget_ranges_locales_parent_id_idx" ON "forms_budget_ranges_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_best_times_order_idx" ON "forms_best_times" USING btree ("_order");
  CREATE INDEX "forms_best_times_parent_id_idx" ON "forms_best_times" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_best_times_locales_locale_parent_id_unique" ON "forms_best_times_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_best_times_locales_parent_id_idx" ON "forms_best_times_locales" USING btree ("_parent_id");
  CREATE INDEX "forms_subjects_order_idx" ON "forms_subjects" USING btree ("_order");
  CREATE INDEX "forms_subjects_parent_id_idx" ON "forms_subjects" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_subjects_locales_locale_parent_id_unique" ON "forms_subjects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_subjects_locales_parent_id_idx" ON "forms_subjects_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_locales_parent_id_idx" ON "forms_locales" USING btree ("_parent_id");
  CREATE INDEX "seo_redirects_order_idx" ON "seo_redirects" USING btree ("_order");
  CREATE INDEX "seo_redirects_parent_id_idx" ON "seo_redirects" USING btree ("_parent_id");
  CREATE INDEX "seo_og_image_idx" ON "seo" USING btree ("og_image_id");
  CREATE UNIQUE INDEX "seo_locales_locale_parent_id_unique" ON "seo_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "seo_locales_parent_id_idx" ON "seo_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "announcement_locales_locale_parent_id_unique" ON "announcement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "announcement_locales_parent_id_idx" ON "announcement_locales" USING btree ("_parent_id");
  CREATE INDEX "popup_image_idx" ON "popup" USING btree ("image_id");
  CREATE UNIQUE INDEX "popup_locales_locale_parent_id_unique" ON "popup_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "popup_locales_parent_id_idx" ON "popup_locales" USING btree ("_parent_id");
  CREATE INDEX "popup_texts_order_parent" ON "popup_texts" USING btree ("order","parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "leads_notes" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "leads_rels" CASCADE;
  DROP TABLE "lead_files" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_items" CASCADE;
  DROP TABLE "pages_blocks_stats_items_locales" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_featured_projects" CASCADE;
  DROP TABLE "pages_blocks_featured_projects_locales" CASCADE;
  DROP TABLE "pages_blocks_features_items" CASCADE;
  DROP TABLE "pages_blocks_features_items_locales" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "pages_blocks_features_locales" CASCADE;
  DROP TABLE "pages_blocks_landowner_band_steps" CASCADE;
  DROP TABLE "pages_blocks_landowner_band_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_landowner_band" CASCADE;
  DROP TABLE "pages_blocks_landowner_band_locales" CASCADE;
  DROP TABLE "pages_blocks_steps_items" CASCADE;
  DROP TABLE "pages_blocks_steps_items_locales" CASCADE;
  DROP TABLE "pages_blocks_steps" CASCADE;
  DROP TABLE "pages_blocks_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_nrb_banner" CASCADE;
  DROP TABLE "pages_blocks_nrb_banner_locales" CASCADE;
  DROP TABLE "pages_blocks_blog_latest" CASCADE;
  DROP TABLE "pages_blocks_blog_latest_locales" CASCADE;
  DROP TABLE "pages_blocks_enquiry_form" CASCADE;
  DROP TABLE "pages_blocks_enquiry_form_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_image_text_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_band" CASCADE;
  DROP TABLE "pages_blocks_cta_band_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_projects_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features_items" CASCADE;
  DROP TABLE "_pages_v_blocks_features_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_landowner_band_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_landowner_band_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_landowner_band" CASCADE;
  DROP TABLE "_pages_v_blocks_landowner_band_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_steps_items" CASCADE;
  DROP TABLE "_pages_v_blocks_steps_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_nrb_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_nrb_banner_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_latest" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_latest_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_enquiry_form" CASCADE;
  DROP TABLE "_pages_v_blocks_enquiry_form_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "projects_videos" CASCADE;
  DROP TABLE "projects_videos_locales" CASCADE;
  DROP TABLE "projects_floor_plans" CASCADE;
  DROP TABLE "projects_floor_plans_locales" CASCADE;
  DROP TABLE "projects_nearby" CASCADE;
  DROP TABLE "projects_nearby_locales" CASCADE;
  DROP TABLE "projects_progress_updates" CASCADE;
  DROP TABLE "projects_progress_updates_locales" CASCADE;
  DROP TABLE "projects_faqs" CASCADE;
  DROP TABLE "projects_faqs_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_videos" CASCADE;
  DROP TABLE "_projects_v_version_videos_locales" CASCADE;
  DROP TABLE "_projects_v_version_floor_plans" CASCADE;
  DROP TABLE "_projects_v_version_floor_plans_locales" CASCADE;
  DROP TABLE "_projects_v_version_nearby" CASCADE;
  DROP TABLE "_projects_v_version_nearby_locales" CASCADE;
  DROP TABLE "_projects_v_version_progress_updates" CASCADE;
  DROP TABLE "_projects_v_version_progress_updates_locales" CASCADE;
  DROP TABLE "_projects_v_version_faqs" CASCADE;
  DROP TABLE "_projects_v_version_faqs_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "areas" CASCADE;
  DROP TABLE "areas_locales" CASCADE;
  DROP TABLE "amenities" CASCADE;
  DROP TABLE "amenities_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "team" CASCADE;
  DROP TABLE "team_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "branding" CASCADE;
  DROP TABLE "branding_locales" CASCADE;
  DROP TABLE "header_menu" CASCADE;
  DROP TABLE "header_menu_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "contact_emails" CASCADE;
  DROP TABLE "contact_emails_locales" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "contact_locales" CASCADE;
  DROP TABLE "site_settings_stats" CASCADE;
  DROP TABLE "site_settings_stats_locales" CASCADE;
  DROP TABLE "site_settings_lead_routing_recipients" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "forms_enquiry_recipients" CASCADE;
  DROP TABLE "forms_enquiry_hidden_fields" CASCADE;
  DROP TABLE "forms_enquiry_labels" CASCADE;
  DROP TABLE "forms_enquiry_labels_locales" CASCADE;
  DROP TABLE "forms_brochure_recipients" CASCADE;
  DROP TABLE "forms_brochure_labels" CASCADE;
  DROP TABLE "forms_brochure_labels_locales" CASCADE;
  DROP TABLE "forms_site_visit_recipients" CASCADE;
  DROP TABLE "forms_site_visit_labels" CASCADE;
  DROP TABLE "forms_site_visit_labels_locales" CASCADE;
  DROP TABLE "forms_landowner_recipients" CASCADE;
  DROP TABLE "forms_landowner_hidden_fields" CASCADE;
  DROP TABLE "forms_landowner_labels" CASCADE;
  DROP TABLE "forms_landowner_labels_locales" CASCADE;
  DROP TABLE "forms_nrb_recipients" CASCADE;
  DROP TABLE "forms_nrb_hidden_fields" CASCADE;
  DROP TABLE "forms_nrb_labels" CASCADE;
  DROP TABLE "forms_nrb_labels_locales" CASCADE;
  DROP TABLE "forms_contact_recipients" CASCADE;
  DROP TABLE "forms_contact_hidden_fields" CASCADE;
  DROP TABLE "forms_contact_labels" CASCADE;
  DROP TABLE "forms_contact_labels_locales" CASCADE;
  DROP TABLE "forms_bedrooms" CASCADE;
  DROP TABLE "forms_bedrooms_locales" CASCADE;
  DROP TABLE "forms_time_slots" CASCADE;
  DROP TABLE "forms_time_slots_locales" CASCADE;
  DROP TABLE "forms_budget_ranges" CASCADE;
  DROP TABLE "forms_budget_ranges_locales" CASCADE;
  DROP TABLE "forms_best_times" CASCADE;
  DROP TABLE "forms_best_times_locales" CASCADE;
  DROP TABLE "forms_subjects" CASCADE;
  DROP TABLE "forms_subjects_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "seo_redirects" CASCADE;
  DROP TABLE "seo" CASCADE;
  DROP TABLE "seo_locales" CASCADE;
  DROP TABLE "tracking" CASCADE;
  DROP TABLE "announcement" CASCADE;
  DROP TABLE "announcement_locales" CASCADE;
  DROP TABLE "popup" CASCADE;
  DROP TABLE "popup_locales" CASCADE;
  DROP TABLE "popup_texts" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_leads_type";
  DROP TYPE "public"."enum_leads_segment";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_pages_blocks_hero_background";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_stats_background";
  DROP TYPE "public"."enum_pages_blocks_stats_source";
  DROP TYPE "public"."enum_pages_blocks_featured_projects_background";
  DROP TYPE "public"."enum_pages_blocks_features_items_icon";
  DROP TYPE "public"."enum_pages_blocks_features_background";
  DROP TYPE "public"."enum_pages_blocks_landowner_band_background";
  DROP TYPE "public"."enum_pages_blocks_steps_items_icon";
  DROP TYPE "public"."enum_pages_blocks_steps_background";
  DROP TYPE "public"."enum_pages_blocks_testimonials_background";
  DROP TYPE "public"."enum_pages_blocks_testimonials_filter";
  DROP TYPE "public"."enum_pages_blocks_nrb_banner_background";
  DROP TYPE "public"."enum_pages_blocks_blog_latest_background";
  DROP TYPE "public"."enum_pages_blocks_enquiry_form_background";
  DROP TYPE "public"."enum_pages_blocks_enquiry_form_form";
  DROP TYPE "public"."enum_pages_blocks_rich_text_background";
  DROP TYPE "public"."enum_pages_blocks_rich_text_width";
  DROP TYPE "public"."enum_pages_blocks_image_text_background";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_faq_background";
  DROP TYPE "public"."enum_pages_blocks_cta_band_background";
  DROP TYPE "public"."enum_pages_blocks_gallery_background";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_background";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_stats_background";
  DROP TYPE "public"."enum__pages_v_blocks_stats_source";
  DROP TYPE "public"."enum__pages_v_blocks_featured_projects_background";
  DROP TYPE "public"."enum__pages_v_blocks_features_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_features_background";
  DROP TYPE "public"."enum__pages_v_blocks_landowner_band_background";
  DROP TYPE "public"."enum__pages_v_blocks_steps_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_steps_background";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_filter";
  DROP TYPE "public"."enum__pages_v_blocks_nrb_banner_background";
  DROP TYPE "public"."enum__pages_v_blocks_blog_latest_background";
  DROP TYPE "public"."enum__pages_v_blocks_enquiry_form_background";
  DROP TYPE "public"."enum__pages_v_blocks_enquiry_form_form";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_width";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_faq_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_background";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_background";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_projects_nearby_mode";
  DROP TYPE "public"."enum_projects_sales_status";
  DROP TYPE "public"."enum_projects_type";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_nearby_mode";
  DROP TYPE "public"."enum__projects_v_version_type";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_amenities_icon";
  DROP TYPE "public"."enum_testimonials_type";
  DROP TYPE "public"."enum_posts_category";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_category";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_forms_enquiry_hidden_fields";
  DROP TYPE "public"."enum_forms_landowner_hidden_fields";
  DROP TYPE "public"."enum_forms_nrb_hidden_fields";
  DROP TYPE "public"."enum_forms_contact_hidden_fields";
  DROP TYPE "public"."enum_popup_trigger";`)
}

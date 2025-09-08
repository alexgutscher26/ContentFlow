CREATE INDEX "analytics_recorded_at_idx" ON "analytics" USING btree ("recorded_at");--> statement-breakpoint
CREATE INDEX "drafts_status_idx" ON "drafts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "posts_status_scheduled_for_idx" ON "posts" USING btree ("status","scheduled_for");--> statement-breakpoint
CREATE INDEX "team_members_status_idx" ON "team_members" USING btree ("status");
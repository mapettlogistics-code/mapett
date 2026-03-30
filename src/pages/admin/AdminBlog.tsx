import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Save, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  author: string | null;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

const AdminBlog = () => {
  const { isAdmin } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    author: "Mapett Logistics",
    category: "News",
    is_published: false,
  });

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load posts");
    } else {
      setPosts((data as BlogPost[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchPosts();
  }, [isAdmin]);

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", image_url: "", author: "Mapett Logistics", category: "News", is_published: false });
    setEditing(null);
    setIsCreating(false);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const startEdit = (post: BlogPost) => {
    setEditing(post);
    setIsCreating(false);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      image_url: post.image_url || "",
      author: post.author || "Mapett Logistics",
      category: post.category || "News",
      is_published: post.is_published,
    });
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);
    const slug = form.slug || generateSlug(form.title);
    try {
      const payload = {
        title: form.title,
        slug,
        excerpt: form.excerpt || null,
        content: form.content,
        image_url: form.image_url || null,
        author: form.author || null,
        category: form.category || null,
        is_published: form.is_published,
        published_at: form.is_published ? new Date().toISOString() : null,
      };

      if (editing) {
        const { error } = await (supabase as any).from("blog_posts").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Post updated");
      } else {
        const { error } = await (supabase as any).from("blog_posts").insert(payload);
        if (error) throw error;
        toast.success("Post created");
      }
      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await (supabase as any).from("blog_posts").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Deleted"); fetchPosts(); }
  };

  const togglePublish = async (post: BlogPost) => {
    const { error } = await (supabase as any).from("blog_posts").update({
      is_published: !post.is_published,
      published_at: !post.is_published ? new Date().toISOString() : null,
    }).eq("id", post.id);
    if (error) toast.error("Failed to update");
    else fetchPosts();
  };

  return (
    <AdminLayout title="Blog Management" subtitle="Create and manage blog posts and logistics news">
      {(isCreating || editing) && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit Post" : "New Post"}</h3>
            <button onClick={resetForm} className="p-2 hover:bg-secondary rounded-lg"><X className="h-4 w-4" /></button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={e => { setForm(f => ({ ...f, title: e.target.value, slug: generateSlug(e.target.value) })); }} placeholder="Post title" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="post-url-slug" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="News" />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Mapett Logistics" />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Brief summary..." rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Content *</Label>
              <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Full blog post content (Markdown supported)..." rows={10} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="is_published" checked={form.is_published} onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))} className="rounded" />
                <Label htmlFor="is_published">Publish immediately</Label>
              </div>
              <div className="flex-1" />
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="hero-gradient text-primary-foreground">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {editing ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Posts ({posts.length})</h3>
        {!isCreating && !editing && (
          <Button onClick={() => { resetForm(); setIsCreating(true); }} size="sm" className="hero-gradient text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No blog posts yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className={`flex items-center gap-4 p-4 bg-card border rounded-xl ${post.is_published ? "border-border" : "border-border/50 opacity-60"}`}>
              {post.image_url && <img src={post.image_url} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{post.title}</p>
                <p className="text-xs text-muted-foreground">{post.category} · {post.author}</p>
              </div>
              <button onClick={() => togglePublish(post)} className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${post.is_published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                {post.is_published ? <><Eye className="h-3 w-3" /> Published</> : <><EyeOff className="h-3 w-3" /> Draft</>}
              </button>
              <Button variant="ghost" size="icon" onClick={() => startEdit(post)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBlog;

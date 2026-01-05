import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Mail, TrendingUp, Calendar, Phone, Building, MessageSquare, Download, FileText, Plus, Edit, Trash2, X, Upload, Brain, FileSpreadsheet } from 'lucide-react';
import { adminLogin, getContacts, getNewsletters, getStats, getROIDownloads, getAdminBlogs, createBlog, updateBlog, deleteBlog, uploadBlogImage, getAIAnalyses } from '../lib/api';
import * as XLSX from 'xlsx';

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  createdAt: string;
}

interface Newsletter {
  _id: string;
  email: string;
  subscribedAt: string;
}

interface ROIDownload {
  _id: string;
  name: string;
  email: string;
  reportData: {
    currency: string;
    volumeTonsPerMonth: number;
    annualQtyTons?: number;
    numSteps: number;
    reactions?: string[];
    roiMonths: number;
    totalCostClientINR: number;
    savingsAfterFaasINR: number;
    ksmCostINR?: number;
    flowneticsKsmINR?: number;
    savingsRmPerKgINR?: number;
    faasPerKgINR?: number;
    savingsRmPerAnnumINR?: number;
    flowneticsFeesPerYearINR?: number;
    partA_INR?: number;
    partBC_INR?: number;
    refundableINR?: number;
    interestRefundableINR?: number;
    faasPercent?: number;
  };
  downloadedAt: string;
}

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  slug: string;
  image: string;
  imageId?: string;
  author: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
}

interface AIAnalysis {
  _id: string;
  reactionName: string;
  feasibilityScore: number | null;
  analysisHtml: string;
  analyzedAt: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [downloads, setDownloads] = useState<ROIDownload[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [aiAnalyses, setAiAnalyses] = useState<AIAnalysis[]>([]);
  const [stats, setStats] = useState({ contacts: 0, newsletters: 0, downloads: 0, blogs: 0, aiAnalyses: 0 });
  const [activeTab, setActiveTab] = useState<'contacts' | 'newsletters' | 'downloads' | 'blogs' | 'ai-analyses'>('contacts');
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    slug: '',
    author: 'Flownetics Team',
    readTime: '5 min read',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingBlog, setSavingBlog] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const [contactsData, newslettersData, statsData, downloadsData, blogsData, aiAnalysesData] = await Promise.all([
        getContacts(token),
        getNewsletters(token),
        getStats(token),
        getROIDownloads(token),
        getAdminBlogs(token),
        getAIAnalyses(token),
      ]);
      setContacts(contactsData);
      setNewsletters(newslettersData);
      setStats(statsData);
      setDownloads(downloadsData);
      setBlogs(blogsData);
      setAiAnalyses(aiAnalysesData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminLogin(username, password);
      localStorage.setItem('adminToken', response.token);
      setIsAuthenticated(true);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setContacts([]);
    setNewsletters([]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (!amount || isNaN(amount)) return 'N/A';
    const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹';
    return `${symbol} ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const exportToExcel = (data: any[], filename: string, sheetName: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const handleExportContacts = () => {
    const exportData = contacts.map(contact => ({
      'First Name': contact.firstName,
      'Last Name': contact.lastName,
      'Email': contact.email,
      'Phone': contact.phone || '',
      'Company': contact.company || '',
      'Message': contact.message || '',
      'Date': formatDate(contact.createdAt),
    }));
    exportToExcel(exportData, 'contacts', 'Contacts');
  };

  const handleExportNewsletters = () => {
    const exportData = newsletters.map(newsletter => ({
      'Email': newsletter.email,
      'Subscribed At': formatDate(newsletter.subscribedAt),
    }));
    exportToExcel(exportData, 'newsletters', 'Newsletters');
  };

  const handleExportROI = () => {
    const exportData = downloads.map(download => {
      const rd = download.reportData;
      const annualQty = rd.annualQtyTons || (rd.volumeTonsPerMonth * 12);
      const reactionsStr = rd.reactions ? rd.reactions.filter(r => r).join(', ') : 'N/A';
      
      return {
        'Name': download.name,
        'Email': download.email,
        'Currency': rd.currency,
        'Volume (tons/month)': rd.volumeTonsPerMonth,
        'Annual Quantity (tons)': annualQty,
        'Number of Steps': rd.numSteps,
        'Reactions': reactionsStr,
        'KSM Cost (INR)': rd.ksmCostINR ? formatCurrency(rd.ksmCostINR, rd.currency) : 'N/A',
        'Flownetics KSM (INR)': rd.flowneticsKsmINR ? formatCurrency(rd.flowneticsKsmINR, rd.currency) : 'N/A',
        'Savings RM/kg (INR)': rd.savingsRmPerKgINR ? formatCurrency(rd.savingsRmPerKgINR, rd.currency) : 'N/A',
        'FaaS %': rd.faasPercent || 'N/A',
        'FaaS per kg (INR)': rd.faasPerKgINR ? formatCurrency(rd.faasPerKgINR, rd.currency) : 'N/A',
        'Savings RM/Annum (INR)': rd.savingsRmPerAnnumINR ? formatCurrency(rd.savingsRmPerAnnumINR, rd.currency) : 'N/A',
        'Flownetics Fees/Year (INR)': rd.flowneticsFeesPerYearINR ? formatCurrency(rd.flowneticsFeesPerYearINR, rd.currency) : 'N/A',
        'Savings After FaaS (INR)': formatCurrency(rd.savingsAfterFaasINR, rd.currency),
        'Part A (INR)': rd.partA_INR ? formatCurrency(rd.partA_INR, rd.currency) : 'N/A',
        'Part BC (INR)': rd.partBC_INR ? formatCurrency(rd.partBC_INR, rd.currency) : 'N/A',
        'Refundable (INR)': rd.refundableINR ? formatCurrency(rd.refundableINR, rd.currency) : 'N/A',
        'Interest Refundable (INR)': rd.interestRefundableINR ? formatCurrency(rd.interestRefundableINR, rd.currency) : 'N/A',
        'Total Cost Client (INR)': formatCurrency(rd.totalCostClientINR, rd.currency),
        'ROI (months)': rd.roiMonths.toFixed(2),
        'Downloaded At': formatDate(download.downloadedAt),
      };
    });
    exportToExcel(exportData, 'roi-downloads', 'ROI Downloads');
  };

  const handleExportBlogs = () => {
    const exportData = blogs.map(blog => ({
      'Title': blog.title,
      'Excerpt': blog.excerpt,
      'Category': blog.category,
      'Author': blog.author,
      'Read Time': blog.readTime,
      'Date': new Date(blog.date).toLocaleDateString(),
      'Slug': blog.slug,
      'Created At': formatDate(blog.createdAt),
      'Updated At': formatDate(blog.updatedAt),
    }));
    exportToExcel(exportData, 'blogs', 'Blogs');
  };

  const handleExportAIAnalyses = () => {
    const exportData = aiAnalyses.map(analysis => ({
      'Reaction Name': analysis.reactionName,
      'Feasibility Score': analysis.feasibilityScore !== null ? `${analysis.feasibilityScore}/10` : 'N/A',
      'Analyzed At': formatDate(analysis.analyzedAt),
    }));
    exportToExcel(exportData, 'ai-analyses', 'AI Analyses');
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return null;
    
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('Not authenticated');

    setUploadingImage(true);
    try {
      const result = await uploadBlogImage(imageFile, token);
      return result.imageId;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveBlog = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    if (!blogForm.title || !blogForm.excerpt || !blogForm.content || !blogForm.category || !blogForm.slug) {
      alert('Please fill in all required fields');
      return;
    }

    setSavingBlog(true);
    try {
      let imageId = editingBlog?.imageId;

      // Upload new image if selected
      if (imageFile) {
        imageId = await handleUploadImage();
      }

      if (!imageId) {
        alert('Please upload an image');
        return;
      }

      const blogData = {
        ...blogForm,
        imageId,
      };

      if (editingBlog) {
        await updateBlog(editingBlog._id, blogData, token);
      } else {
        await createBlog(blogData, token);
      }

      // Reset form and close modal
      setShowBlogModal(false);
      setEditingBlog(null);
      setBlogForm({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        slug: '',
        author: 'Flownetics Team',
        readTime: '5 min read',
      });
      setImageFile(null);
      setImagePreview('');
      
      // Refresh blogs list
      fetchData();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert(error instanceof Error ? error.message : 'Failed to save blog');
    } finally {
      setSavingBlog(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      await deleteBlog(id, token);
      fetchData();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      date: new Date(blog.date).toISOString().split('T')[0],
      slug: blog.slug,
      author: blog.author,
      readTime: blog.readTime,
    });
    setImagePreview(blog.image.startsWith('http') ? blog.image : `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}${blog.image}`);
    setImageFile(null);
    setShowBlogModal(true);
  };

  const handleNewBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      slug: '',
      author: 'Flownetics Team',
      readTime: '5 min read',
    });
    setImageFile(null);
    setImagePreview('');
    setShowBlogModal(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black flex items-center justify-center px-6">
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange via-brand-purple to-brand-green blur-lg opacity-40"></div>
                <h1 className="relative text-3xl font-bold tracking-tighter bg-gradient-to-r from-brand-orange via-brand-purple to-brand-green bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Flownetics Admin Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-purple text-white font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-purple/30 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black">
      {/* Header */}
      <header className="bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-orange via-brand-purple to-brand-green bg-clip-text text-transparent">
              Flownetics Admin
            </h1>
            <p className="text-gray-400 text-sm">Dashboard Panel</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-[10px] sm:text-xs mb-1">Total Contacts</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.contacts}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-brand-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-brand-purple" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-[10px] sm:text-xs mb-1">Newsletter</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.newsletters}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-brand-green" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-[10px] sm:text-xs mb-1">ROI Downloads</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.downloads || 0}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-brand-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-brand-orange" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-[10px] sm:text-xs mb-1">Blog Posts</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.blogs || 0}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-brand-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-brand-purple" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-[10px] sm:text-xs mb-1">AI Analyses</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stats.aiAnalyses || 0}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-brand-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-brand-blue" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg">
          <div className="border-b border-gray-800 flex flex-wrap overflow-x-auto">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 min-w-[120px] px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'contacts'
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="hidden sm:inline">Contacts </span>
              <span className="sm:hidden">Contacts</span>
              <span className="sm:ml-1">({contacts.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('newsletters')}
              className={`flex-1 min-w-[120px] px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'newsletters'
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="hidden sm:inline">Newsletters </span>
              <span className="sm:hidden">News</span>
              <span className="sm:ml-1">({newsletters.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`flex-1 min-w-[120px] px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'downloads'
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="hidden sm:inline">ROI Downloads </span>
              <span className="sm:hidden">ROI</span>
              <span className="sm:ml-1">({downloads.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`flex-1 min-w-[120px] px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'blogs'
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="hidden sm:inline">Blogs </span>
              <span className="sm:hidden">Blogs</span>
              <span className="sm:ml-1">({blogs.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-analyses')}
              className={`flex-1 min-w-[120px] px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'ai-analyses'
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="hidden sm:inline">AI Analyses </span>
              <span className="sm:hidden">AI</span>
              <span className="sm:ml-1">({aiAnalyses.length})</span>
            </button>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            {activeTab === 'contacts' ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Contacts</h2>
                  {contacts.length > 0 && (
                    <button
                      onClick={handleExportContacts}
                      className="flex items-center gap-2 bg-brand-green/20 hover:bg-brand-green/30 text-brand-green px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all border border-brand-green/30 text-xs sm:text-sm"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Export to Excel</span>
                      <span className="sm:hidden">Export</span>
                    </button>
                  )}
                </div>
                {contacts.length === 0 ? (
                  <p className="text-gray-400 text-center py-8 text-sm sm:text-base">No contacts yet</p>
                ) : (
                  <>
                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                      {contacts.map((contact) => (
                        <div key={contact._id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-white font-medium text-sm">{contact.firstName} {contact.lastName}</p>
                              <p className="text-gray-400 text-xs">{contact.email}</p>
                            </div>
                          </div>
                          {contact.phone && (
                            <div className="text-gray-300 text-xs">
                              <span className="text-gray-500">Phone: </span>{contact.phone}
                            </div>
                          )}
                          {contact.company && (
                            <div className="text-gray-300 text-xs">
                              <span className="text-gray-500">Company: </span>{contact.company}
                            </div>
                          )}
                          {contact.message && (
                            <div className="text-gray-300 text-xs">
                              <span className="text-gray-500">Message: </span>{contact.message}
                            </div>
                          )}
                          <div className="text-gray-400 text-xs pt-2 border-t border-gray-700">
                            {formatDate(contact.createdAt)}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto -mx-6 md:mx-0">
                      <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full divide-y divide-gray-800">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs sm:text-sm">Name</th>
                              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs sm:text-sm">Email</th>
                              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs sm:text-sm">Phone</th>
                              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs sm:text-sm">Company</th>
                              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs sm:text-sm">Message</th>
                              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs sm:text-sm">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contacts.map((contact) => (
                              <tr key={contact._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                                <td className="py-3 px-4 text-white text-sm">
                                  {contact.firstName} {contact.lastName}
                                </td>
                                <td className="py-3 px-4 text-gray-300 text-sm">{contact.email}</td>
                                <td className="py-3 px-4 text-gray-300 text-sm">{contact.phone || '-'}</td>
                                <td className="py-3 px-4 text-gray-300 text-sm">{contact.company || '-'}</td>
                                <td className="py-3 px-4 text-gray-300 text-sm max-w-xs truncate">
                                  {contact.message || '-'}
                                </td>
                                <td className="py-3 px-4 text-gray-400 text-xs sm:text-sm">
                                  {formatDate(contact.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : activeTab === 'newsletters' ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Newsletter Subscriptions</h2>
                  {newsletters.length > 0 && (
                    <button
                      onClick={handleExportNewsletters}
                      className="flex items-center gap-2 bg-brand-green/20 hover:bg-brand-green/30 text-brand-green px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all border border-brand-green/30 text-xs sm:text-sm"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Export to Excel</span>
                      <span className="sm:hidden">Export</span>
                    </button>
                  )}
                </div>
                {newsletters.length === 0 ? (
                  <p className="text-gray-400 text-center py-8 text-sm sm:text-base">No newsletter subscriptions yet</p>
                ) : (
                  <>
                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                      {newsletters.map((newsletter) => (
                        <div key={newsletter._id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                          <p className="text-white text-sm mb-1">{newsletter.email}</p>
                          <p className="text-gray-400 text-xs">{formatDate(newsletter.subscribedAt)}</p>
                        </div>
                      ))}
                    </div>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs sm:text-sm">Email</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs sm:text-sm">Subscribed At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newsletters.map((newsletter) => (
                            <tr key={newsletter._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                              <td className="py-3 px-4 text-white text-sm">{newsletter.email}</td>
                              <td className="py-3 px-4 text-gray-400 text-xs sm:text-sm">
                                {formatDate(newsletter.subscribedAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            ) : activeTab === 'downloads' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">ROI Downloads</h2>
                  {downloads.length > 0 && (
                    <button
                      onClick={handleExportROI}
                      className="flex items-center gap-2 bg-brand-green/20 hover:bg-brand-green/30 text-brand-green px-4 py-2 rounded-lg transition-all border border-brand-green/30"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      Export to Excel
                    </button>
                  )}
                </div>
                {downloads.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No ROI downloads yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Name</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Email</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Currency</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Volume (t/mo)</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Annual (tons)</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Steps</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Reactions</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">KSM Cost</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">FaaS %</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Savings/Annum</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">FaaS Fees/Year</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Savings After FaaS</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Total Cost</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">ROI (mo)</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {downloads.map((download) => {
                          const rd = download.reportData;
                          const annualQty = rd.annualQtyTons || (rd.volumeTonsPerMonth * 12);
                          const reactionsStr = rd.reactions ? rd.reactions.filter(r => r).join(', ') : 'N/A';
                          return (
                            <tr key={download._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                              <td className="py-3 px-4 text-white">{download.name}</td>
                              <td className="py-3 px-4 text-gray-300">{download.email}</td>
                              <td className="py-3 px-4 text-gray-300">{rd.currency}</td>
                              <td className="py-3 px-4 text-gray-300">{rd.volumeTonsPerMonth}</td>
                              <td className="py-3 px-4 text-gray-300">{annualQty.toFixed(1)}</td>
                              <td className="py-3 px-4 text-gray-300">{rd.numSteps}</td>
                              <td className="py-3 px-4 text-gray-300 text-xs">{reactionsStr}</td>
                              <td className="py-3 px-4 text-gray-300">
                                {rd.ksmCostINR ? formatCurrency(rd.ksmCostINR, rd.currency) : 'N/A'}
                              </td>
                              <td className="py-3 px-4 text-gray-300">{rd.faasPercent ? `${rd.faasPercent}%` : 'N/A'}</td>
                              <td className="py-3 px-4 text-gray-300">
                                {rd.savingsRmPerAnnumINR ? formatCurrency(rd.savingsRmPerAnnumINR, rd.currency) : 'N/A'}
                              </td>
                              <td className="py-3 px-4 text-gray-300">
                                {rd.flowneticsFeesPerYearINR ? formatCurrency(rd.flowneticsFeesPerYearINR, rd.currency) : 'N/A'}
                              </td>
                              <td className="py-3 px-4 text-brand-green font-semibold">
                                {formatCurrency(rd.savingsAfterFaasINR, rd.currency)}
                              </td>
                              <td className="py-3 px-4 text-gray-300">
                                {formatCurrency(rd.totalCostClientINR, rd.currency)}
                              </td>
                              <td className="py-3 px-4 text-brand-orange font-semibold">{rd.roiMonths.toFixed(1)}</td>
                              <td className="py-3 px-4 text-gray-400 text-xs">
                                {formatDate(download.downloadedAt)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : activeTab === 'ai-analyses' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">AI Process Architect Analyses</h2>
                  {aiAnalyses.length > 0 && (
                    <button
                      onClick={handleExportAIAnalyses}
                      className="flex items-center gap-2 bg-brand-green/20 hover:bg-brand-green/30 text-brand-green px-4 py-2 rounded-lg transition-all border border-brand-green/30"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      Export to Excel
                    </button>
                  )}
                </div>
                {aiAnalyses.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No AI analyses yet</p>
                ) : (
                  <div className="space-y-4">
                    {aiAnalyses.map((analysis) => (
                      <div
                        key={analysis._id}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">{analysis.reactionName}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              {analysis.feasibilityScore !== null && (
                                <span className="flex items-center gap-1">
                                  <span className="text-brand-purple font-semibold">Score:</span>
                                  <span className="text-white">{analysis.feasibilityScore}/10</span>
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(analysis.analyzedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="ai-content text-gray-300 text-sm"
                          dangerouslySetInnerHTML={{ __html: analysis.analysisHtml }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Blog Posts</h2>
                  <div className="flex gap-2">
                    {blogs.length > 0 && (
                      <button
                        onClick={handleExportBlogs}
                        className="flex items-center gap-2 bg-brand-green/20 hover:bg-brand-green/30 text-brand-green px-4 py-2 rounded-lg transition-all border border-brand-green/30"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        Export to Excel
                      </button>
                    )}
                    <button
                      onClick={handleNewBlog}
                      className="flex items-center gap-2 bg-gradient-purple text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      New Blog
                    </button>
                  </div>
                </div>
                {blogs.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No blogs yet. Create your first blog post!</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Title</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Category</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Date</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Author</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((blog) => (
                          <tr key={blog._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                            <td className="py-3 px-4 text-white font-medium">{blog.title}</td>
                            <td className="py-3 px-4 text-gray-300">
                              <span className="bg-brand-purple/20 text-brand-purple px-2 py-1 rounded text-xs">
                                {blog.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-300 text-sm">
                              {new Date(blog.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-gray-300 text-sm">{blog.author}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditBlog(blog)}
                                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4 text-brand-orange" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(blog._id)}
                                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              <button
                onClick={() => {
                  setShowBlogModal(false);
                  setEditingBlog(null);
                  setImageFile(null);
                  setImagePreview('');
                }}
                className="w-10 h-10 rounded-full hover:bg-gray-800 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Blog Image *</label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  )}
                  <label className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    {imageFile ? 'Change Image' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                </div>
                {uploadingImage && <p className="text-gray-400 text-sm mt-2">Uploading image...</p>}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Slug * (URL-friendly)</label>
                <input
                  type="text"
                  value={blogForm.slug}
                  onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                  placeholder="blog-post-slug"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Excerpt *</label>
                <textarea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                  placeholder="Short description of the blog post"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Content * (HTML supported)</label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  rows={12}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none font-mono text-sm"
                  placeholder="Enter blog content (HTML supported)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Category *</label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                    placeholder="Technology, Innovation, etc."
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Date *</label>
                  <input
                    type="date"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Author</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                    placeholder="Author name"
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                    placeholder="5 min read"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowBlogModal(false);
                    setEditingBlog(null);
                    setImageFile(null);
                    setImagePreview('');
                  }}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBlog}
                  disabled={savingBlog || uploadingImage}
                  className="px-6 py-2 bg-gradient-purple text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {savingBlog ? 'Saving...' : editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


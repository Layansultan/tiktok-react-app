import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// ─── Firebase mocks ────────────────────────────────────────────
// Hooks that talk to Firebase are mocked so tests run offline.
jest.mock('./hooks/useAuth', () => ({
  useAuth: () => ({ user: null, signIn: jest.fn(), logOut: jest.fn(), loading: false }),
}));
jest.mock('./hooks/useInbox', () => {
  const { INBOX_ITEMS } = require('./data/mockData');
  return { useInbox: () => ({ items: INBOX_ITEMS, markAllRead: jest.fn() }) };
});
jest.mock('./hooks/useReposts', () => ({
  useReposts: () => ({
    reposts: [],
    addRepost: jest.fn(),
    removeRepost: jest.fn(),
    hasReposted: () => false,
  }),
}));
jest.mock('./hooks/useUserLikes', () => ({
  useUserLikes: () => [],
}));
jest.mock('./hooks/useLikes', () => ({
  useLikes: (_id, initialCount) => ({ liked: false, count: initialCount, toggle: jest.fn() }),
  formatCount: (n) => (typeof n === 'string' ? n : String(n)),
}));

// ─── helpers ──────────────────────────────────────────────────
const tap = (el) => userEvent.click(el);

/* Dismiss the login screen (user: null → guest mode) */
const skipLogin = () => tap(screen.getByText('Continue as guest'));

/* Open the share sheet from the FYP action bar */
const openShareSheet = () => {
  tap(screen.getAllByText('↗')[0]);
};

/* Navigate to profile and open the first video */
const openProfileVideo = () => {
  tap(screen.getByText('Profile'));
  tap(screen.getByText('▶ 2.1M'));
};

/* Navigate to profile → video → options → privacy */
const openPrivacySettings = () => {
  openProfileVideo();
  tap(screen.getByText('•••'));
  tap(screen.getAllByText('Privacy')[0]);
};

// ─────────────────────────────────────────────────────────────
describe('App — smoke', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('shows the phone shell status bar time', () => {
    render(<App />);
    expect(screen.getByText('9:41')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Login screen', () => {
  it('shows the login screen on first load when not signed in', () => {
    render(<App />);
    expect(screen.getByText('Sign in to like, repost, and get notified')).toBeInTheDocument();
  });

  it('shows Continue with Google button', () => {
    render(<App />);
    expect(screen.getByText('Continue with Google')).toBeInTheDocument();
  });

  it('shows Continue as guest button', () => {
    render(<App />);
    expect(screen.getByText('Continue as guest')).toBeInTheDocument();
  });

  it('Continue as guest dismisses the login screen', () => {
    render(<App />);
    tap(screen.getByText('Continue as guest'));
    expect(screen.queryByText('Continue as guest')).not.toBeInTheDocument();
  });

  it('FYP feed is accessible after skipping login', () => {
    render(<App />);
    skipLogin();
    expect(screen.getByText('For you')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Bottom navigation', () => {
  it('starts on the home / FYP tab', () => {
    render(<App />);
    expect(screen.getByText('For you')).toBeInTheDocument();
  });

  it('switches to Friends tab', () => {
    render(<App />);
    tap(screen.getByText('Friends'));
    expect(screen.getAllByText('Friends').length).toBeGreaterThan(0);
  });

  it('switches to Inbox tab', () => {
    render(<App />);
    tap(screen.getByText('Inbox'));
    expect(screen.getByText('Inbox', { selector: 'span' })).toBeInTheDocument();
  });

  it('switches to Profile tab', () => {
    render(<App />);
    tap(screen.getByText('Profile'));
    expect(screen.getByText('@layan')).toBeInTheDocument();
  });

  it('navigating back to home shows FYP again', () => {
    render(<App />);
    tap(screen.getByText('Profile'));
    tap(screen.getByText('Home'));
    expect(screen.getByText('For you')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Share flow — main sheet', () => {
  it('opens main share sheet when tapping share', () => {
    render(<App />);
    openShareSheet();
    expect(screen.getByText('Send to')).toBeInTheDocument();
  });

  it('main sheet shows the always-visible consent banner', () => {
    render(<App />);
    openShareSheet();
    expect(screen.getByText(/may reach audiences beyond the original context/i)).toBeInTheDocument();
  });

  it('main sheet consent banner labels Repost, Duet and Stitch', () => {
    render(<App />);
    openShareSheet();
    const banner = screen.getByText(/may reach audiences beyond the original context/i).closest('div');
    expect(within(banner).getByText('Repost')).toBeInTheDocument();
    expect(within(banner).getByText('Duet')).toBeInTheDocument();
    expect(within(banner).getByText('Stitch')).toBeInTheDocument();
  });

  it('tapping the backdrop closes the sheet', () => {
    render(<App />);
    openShareSheet();
    const backdrop = document.querySelector('[data-testid="share-backdrop"]');
    tap(backdrop);
    expect(screen.queryByText('Send to')).not.toBeInTheDocument();
  });

  it('tapping ✕ closes the sheet', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getByText('✕'));
    expect(screen.queryByText('Send to')).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Share flow — Repost', () => {
  it('tapping Repost immediately shows the reposted toast', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Repost')[0]);
    expect(screen.getByText('Reposted!')).toBeInTheDocument();
  });

  it('toast says added to followers feeds', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Repost')[0]);
    expect(screen.getByText(/added to your followers' feeds/i)).toBeInTheDocument();
  });

  it('tapping ✕ on toast closes it', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Repost')[0]);
    tap(screen.getByText('✕'));
    expect(screen.queryByText('Reposted!')).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Share flow — Repost info panel', () => {
  it('tapping i on main sheet opens the info panel', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getByText('i'));
    expect(screen.getByText('About Reposting')).toBeInTheDocument();
    expect(screen.getByText(/expanding its reach beyond the original creator/i)).toBeInTheDocument();
  });

  it('Got it closes the info panel and returns to main sheet', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getByText('i'));
    tap(screen.getByText('Got it'));
    expect(screen.getByText('Send to')).toBeInTheDocument();
    expect(screen.queryByText('About Reposting')).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Share flow — Duet', () => {
  const goToDuet = () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Duet')[0]);
  };

  it('opens the DuetSetupScreen', () => {
    goToDuet();
    expect(screen.getByText(/may reach audiences beyond the original post/i)).toBeInTheDocument();
  });

  it('DuetSetupScreen consent banner shows the creator username', () => {
    goToDuet();
    expect(screen.getByText(/@tomharvey's/i)).toBeInTheDocument();
  });

  it('DuetSetupScreen shows both panels (original + camera)', () => {
    goToDuet();
    expect(screen.getByText('Original creator')).toBeInTheDocument();
    expect(screen.getByText('Your camera')).toBeInTheDocument();
  });

  it('! button opens About Duets panel', () => {
    goToDuet();
    tap(screen.getByText('!'));
    expect(screen.getByText('About Duets')).toBeInTheDocument();
    expect(screen.getByText(/multi-party content/i)).toBeInTheDocument();
  });

  it('About Duets Got it returns to setup screen', () => {
    goToDuet();
    tap(screen.getByText('!'));
    tap(screen.getByText('Got it'));
    expect(screen.queryByText('About Duets')).not.toBeInTheDocument();
    expect(screen.getByText('Original creator')).toBeInTheDocument();
  });

  it('✕ Cancel closes the duet setup', () => {
    goToDuet();
    tap(screen.getByText('✕ Cancel'));
    expect(screen.queryByText('Original creator')).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Share flow — Stitch', () => {
  const goToStitchClip = () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Stitch')[0]);
  };

  it('opens StitchClipSelector', () => {
    goToStitchClip();
    expect(screen.getByText(/@tomharvey's video/i)).toBeInTheDocument();
    expect(screen.getByText('5.0s selected')).toBeInTheDocument();
  });

  it('Next advances to StitchRecordScreen', () => {
    goToStitchClip();
    tap(screen.getByText('Next'));
    expect(screen.getByText(/you are stitching @tomharvey's content/i)).toBeInTheDocument();
  });

  it('StitchRecordScreen consent banner mentions different audience', () => {
    goToStitchClip();
    tap(screen.getByText('Next'));
    expect(screen.getByText(/different audience and context/i)).toBeInTheDocument();
  });

  it('! on StitchRecordScreen opens About Stitching panel', () => {
    goToStitchClip();
    tap(screen.getByText('Next'));
    const bangs = screen.getAllByText('!');
    tap(bangs[bangs.length - 1]);
    expect(screen.getByText('About Stitching')).toBeInTheDocument();
    expect(screen.getByText(/embedding another's content/i)).toBeInTheDocument();
  });

  it('About Stitching Got it returns to record screen', () => {
    goToStitchClip();
    tap(screen.getByText('Next'));
    const bangs = screen.getAllByText('!');
    tap(bangs[bangs.length - 1]);
    tap(screen.getByText('Got it'));
    expect(screen.queryByText('About Stitching')).not.toBeInTheDocument();
    expect(screen.getByText(/you are stitching/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Share flow — creator changes per video', () => {
  it("share sheet from Friends tab uses that video's creator in Duet screen", () => {
    render(<App />);
    tap(screen.getByText('Friends'));
    tap(screen.getAllByText('↗')[0]);
    tap(screen.getAllByText('Duet')[0]);
    expect(screen.getByText(/@mia.designs's/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('FYP feed — Following / For You tabs', () => {
  it('shows For You tab selected by default', () => {
    render(<App />);
    expect(screen.getByText('@tomharvey')).toBeInTheDocument();
  });

  it('Following tab shows following-feed videos', () => {
    render(<App />);
    tap(screen.getByText('Following'));
    expect(screen.getByText(/new series every Sunday/i)).toBeInTheDocument();
  });

  it('switching back to For You restores FYP videos', () => {
    render(<App />);
    tap(screen.getByText('Following'));
    tap(screen.getByText('For you'));
    expect(screen.getByText(/this took some work/i)).toBeInTheDocument();
  });

  it('Following feed shows multiple different creators', () => {
    render(<App />);
    tap(screen.getByText('Following'));
    expect(screen.getByText('@sarahcooks')).toBeInTheDocument();
    expect(screen.getByText('@devwithmike')).toBeInTheDocument();
    expect(screen.getByText('@zeynep.art')).toBeInTheDocument();
  });

  it('FYP renders all five video slides at once for snap-scroll', () => {
    render(<App />);
    expect(screen.getByText('@tomharvey')).toBeInTheDocument();
    expect(screen.getByText('@sarahcooks')).toBeInTheDocument();
    expect(screen.getByText('@devwithmike')).toBeInTheDocument();
    expect(screen.getByText('@zeynep.art')).toBeInTheDocument();
    expect(screen.getByText('@fitnessjay')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('FYP feed — likes UI', () => {
  it('each video slide renders a heart button', () => {
    render(<App />);
    const hearts = screen.getAllByText('♥');
    expect(hearts.length).toBeGreaterThan(0);
  });

  it('like counts come from mock video data', () => {
    render(<App />);
    expect(screen.getByText('3.1M')).toBeInTheDocument();
    expect(screen.getByText('892K')).toBeInTheDocument();
  });

  it('heart is not red when not liked (mock returns liked: false)', () => {
    render(<App />);
    // All hearts in FYP should be white (not red) since mock returns liked: false
    const hearts = screen.getAllByText('♥');
    hearts.forEach(h => {
      expect(h).not.toHaveStyle('color: #fe2c55');
    });
  });
});

// ─────────────────────────────────────────────────────────────
describe('Friends feed', () => {
  const goToFriends = () => {
    render(<App />);
    tap(screen.getByText('Friends'));
  };

  it('shows the Friends heading in the top nav', () => {
    goToFriends();
    expect(screen.getAllByText('Friends').length).toBeGreaterThan(0);
  });

  it('renders all friends video creators', () => {
    goToFriends();
    expect(screen.getByText('@mia.designs')).toBeInTheDocument();
    expect(screen.getByText('@james.runs')).toBeInTheDocument();
    expect(screen.getByText('@priya.eats')).toBeInTheDocument();
    expect(screen.getByText('@alexk')).toBeInTheDocument();
  });

  it('every video has a Friends badge', () => {
    goToFriends();
    const badges = screen.getAllByText('Friends');
    expect(badges.length).toBeGreaterThanOrEqual(4);
  });

  it('shows captions from friends videos', () => {
    goToFriends();
    expect(screen.getByText(/study session w me/i)).toBeInTheDocument();
    expect(screen.getByText(/5am run in London/i)).toBeInTheDocument();
  });

  it('opening the share sheet from Friends shows Send to', () => {
    goToFriends();
    tap(screen.getAllByText('↗')[0]);
    expect(screen.getByText('Send to')).toBeInTheDocument();
  });

  it('navigating away from Friends and back preserves the feed', () => {
    goToFriends();
    tap(screen.getByText('Home'));
    tap(screen.getByText('Friends'));
    expect(screen.getByText('@mia.designs')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Inbox page', () => {
  const goToInbox = () => {
    render(<App />);
    tap(screen.getByText('Inbox'));
  };

  it('shows the Inbox heading', () => {
    goToInbox();
    expect(screen.getByText('Inbox', { selector: 'span' })).toBeInTheDocument();
  });

  it('shows the unread count badge', () => {
    goToInbox();
    expect(screen.getByText(/new · 3/i)).toBeInTheDocument();
  });

  it('shows the Earlier section header', () => {
    goToInbox();
    expect(screen.getByText(/earlier/i)).toBeInTheDocument();
  });

  it('renders all notification usernames', () => {
    goToInbox();
    expect(screen.getByText('@devwithmike')).toBeInTheDocument();
    expect(screen.getByText('@zeynep.art')).toBeInTheDocument();
    expect(screen.getByText('@fitnessjay')).toBeInTheDocument();
    expect(screen.getByText('@sarahcooks')).toBeInTheDocument();
    expect(screen.getByText('@mia.designs')).toBeInTheDocument();
    expect(screen.getByText('@james.runs')).toBeInTheDocument();
    expect(screen.getByText('@alexk')).toBeInTheDocument();
    expect(screen.getByText('@TikTok')).toBeInTheDocument();
  });

  it('renders notification action texts', () => {
    goToInbox();
    expect(screen.getAllByText(/started following you/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/liked your video/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/commented/i)).toBeInTheDocument();
    expect(screen.getByText(/mentioned you/i)).toBeInTheDocument();
    expect(screen.getByText(/dueted with your video/i)).toBeInTheDocument();
  });

  it('shows the system milestone notification', () => {
    goToInbox();
    expect(screen.getByText(/1M views/i)).toBeInTheDocument();
  });

  it('shows Mark all read action', () => {
    goToInbox();
    expect(screen.getByText('Mark all read')).toBeInTheDocument();
  });

  it('shows time-ago labels on notifications', () => {
    goToInbox();
    expect(screen.getByText('2m ago')).toBeInTheDocument();
    expect(screen.getByText('1h ago')).toBeInTheDocument();
    expect(screen.getByText('3d ago')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Profile page', () => {
  const goToProfile = () => {
    render(<App />);
    tap(screen.getByText('Profile'));
  };

  it('shows the user handle', () => {
    goToProfile();
    expect(screen.getByText('@layan')).toBeInTheDocument();
  });

  it('shows the bio line', () => {
    goToProfile();
    expect(screen.getByText(/KCL student/i)).toBeInTheDocument();
  });

  it('shows follower stats', () => {
    goToProfile();
    expect(screen.getByText('Followers')).toBeInTheDocument();
    expect(screen.getByText('Following')).toBeInTheDocument();
    expect(screen.getByText('Likes')).toBeInTheDocument();
  });

  it('shows Edit profile button', () => {
    goToProfile();
    expect(screen.getByText('Edit profile')).toBeInTheDocument();
  });

  it('shows Sign in button when logged out', () => {
    goToProfile();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('renders all six video grid entries by view count', () => {
    goToProfile();
    expect(screen.getByText('▶ 2.1M')).toBeInTheDocument();
    expect(screen.getByText('▶ 890K')).toBeInTheDocument();
    expect(screen.getByText('▶ 450K')).toBeInTheDocument();
    expect(screen.getByText('▶ 1.3M')).toBeInTheDocument();
    expect(screen.getByText('▶ 220K')).toBeInTheDocument();
    expect(screen.getByText('▶ 3.4M')).toBeInTheDocument();
  });

  it('tapping a video opens the full-screen view', () => {
    goToProfile();
    tap(screen.getByText('▶ 2.1M'));
    expect(screen.getByText('Your video')).toBeInTheDocument();
    expect(screen.getByText('Travel vlog pt.1')).toBeInTheDocument();
  });

  it('back arrow returns to profile grid', () => {
    goToProfile();
    tap(screen.getByText('▶ 2.1M'));
    tap(screen.getByText('‹'));
    expect(screen.getByText('@layan')).toBeInTheDocument();
    expect(screen.queryByText('Your video')).not.toBeInTheDocument();
  });

  it('bottom nav is hidden while a video is open', () => {
    goToProfile();
    tap(screen.getByText('▶ 2.1M'));
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('bottom nav reappears after closing video', () => {
    goToProfile();
    tap(screen.getByText('▶ 2.1M'));
    tap(screen.getByText('‹'));
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Profile tabs', () => {
  const goToProfile = () => {
    render(<App />);
    tap(screen.getByText('Profile'));
  };

  it('shows Videos, Reposts and Liked tabs', () => {
    goToProfile();
    expect(screen.getByText('⊞ Videos')).toBeInTheDocument();
    expect(screen.getByText('🔁 Reposts')).toBeInTheDocument();
    expect(screen.getByText('♥ Liked')).toBeInTheDocument();
  });

  it('Videos tab is selected by default and shows the grid', () => {
    goToProfile();
    expect(screen.getByText('▶ 2.1M')).toBeInTheDocument();
  });

  it('Reposts tab shows empty state when no reposts', () => {
    goToProfile();
    tap(screen.getByText('🔁 Reposts'));
    expect(screen.getByText('No reposts yet')).toBeInTheDocument();
    expect(screen.getByText(/videos you repost will appear here/i)).toBeInTheDocument();
  });

  it('Reposts tab mentions original creator credit', () => {
    goToProfile();
    tap(screen.getByText('🔁 Reposts'));
    expect(screen.getByText(/original creator is always credited/i)).toBeInTheDocument();
  });

  it('Liked tab shows empty state when no likes', () => {
    goToProfile();
    tap(screen.getByText('♥ Liked'));
    expect(screen.getByText('No liked videos yet')).toBeInTheDocument();
    expect(screen.getByText(/videos you like will appear here/i)).toBeInTheDocument();
  });

  it('switching between tabs does not show bottom nav issues', () => {
    goToProfile();
    tap(screen.getByText('🔁 Reposts'));
    tap(screen.getByText('⊞ Videos'));
    expect(screen.getByText('▶ 2.1M')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('VideoFullScreen — data accuracy', () => {
  it('shows correct likes count for a profile video', () => {
    render(<App />);
    tap(screen.getByText('Profile'));
    tap(screen.getByText('▶ 2.1M'));
    // Profile video 1 has likes: "180K"
    expect(screen.getByText('180K')).toBeInTheDocument();
  });

  it('shows correct comments count for a profile video', () => {
    render(<App />);
    tap(screen.getByText('Profile'));
    tap(screen.getByText('▶ 2.1M'));
    // Profile video 1 has comments: "4.2K"
    expect(screen.getByText('4.2K')).toBeInTheDocument();
  });

  it('shows correct title and view count in the insights bar', () => {
    render(<App />);
    tap(screen.getByText('Profile'));
    tap(screen.getByText('▶ 2.1M'));
    expect(screen.getByText(/2\.1M views/i)).toBeInTheDocument();
    expect(screen.getByText('Travel vlog pt.1')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('VideoOptionsSheet', () => {
  const openOptions = () => {
    render(<App />);
    openProfileVideo();
    tap(screen.getByText('•••'));
  };

  it('opens video options sheet', () => {
    openOptions();
    expect(screen.getByText('Video options')).toBeInTheDocument();
  });

  it('shows standard action icons', () => {
    openOptions();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('shows Privacy option highlighted', () => {
    openOptions();
    expect(screen.getAllByText('Privacy').length).toBeGreaterThan(0);
  });

  it('shows the privacy hint banner', () => {
    openOptions();
    expect(screen.getByText(/manage who can interact with this video/i)).toBeInTheDocument();
  });

  it('✕ closes options and returns to video', () => {
    openOptions();
    tap(screen.getByText('✕'));
    expect(screen.queryByText('Video options')).not.toBeInTheDocument();
    expect(screen.getByText('Your video')).toBeInTheDocument();
  });

  it('dim backdrop closes options and returns to video', () => {
    openOptions();
    const backdrop = document.querySelector('[data-testid="profile-backdrop"]');
    tap(backdrop);
    expect(screen.queryByText('Video options')).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('PrivacySettingsSheet', () => {
  it('opens privacy settings from options', () => {
    render(<App />);
    openPrivacySettings();
    expect(screen.getByText('Privacy settings')).toBeInTheDocument();
  });

  it('shows audience options', () => {
    render(<App />);
    openPrivacySettings();
    expect(screen.getByText('Everyone')).toBeInTheDocument();
    expect(screen.getByText('Only you')).toBeInTheDocument();
    expect(screen.getByText(/who can watch this video/i)).toBeInTheDocument();
  });

  it('shows all three toggle labels', () => {
    render(<App />);
    openPrivacySettings();
    expect(screen.getByText('Allow comments')).toBeInTheDocument();
    expect(screen.getByText('👥 Allow duets')).toBeInTheDocument();
    expect(screen.getByText('✂ Allow stitches')).toBeInTheDocument();
  });

  it('toggle subtexts explain what each permission does', () => {
    render(<App />);
    openPrivacySettings();
    expect(screen.getByText(/side-by-side videos/i)).toBeInTheDocument();
    expect(screen.getByText(/embed a clip in their posts/i)).toBeInTheDocument();
  });

  it('selecting Everyone reflects in the saved sheet', () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('Everyone'));
    tap(screen.getByText('Save settings'));
    expect(screen.getByText(/audience: everyone/i)).toBeInTheDocument();
  });

  it('selecting Only you reflects in the saved sheet', () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('Only you'));
    tap(screen.getByText('Save settings'));
    expect(screen.getByText(/audience: only you/i)).toBeInTheDocument();
  });

  it('default Friends audience reflects in the saved sheet', () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('Save settings'));
    expect(screen.getByText(/audience: friends only/i)).toBeInTheDocument();
  });

  it('duets default on — saved sheet shows Duets: On', () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('Save settings'));
    expect(screen.getByText(/duets: on/i)).toBeInTheDocument();
  });

  it('stitches default off — saved sheet shows Stitches: Off', () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('Save settings'));
    expect(screen.getByText(/stitches: off/i)).toBeInTheDocument();
  });

  it('toggling duets off reflects in the saved sheet', () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('👥 Allow duets'));
    tap(screen.getByText('Save settings'));
    expect(screen.getByText(/duets: off/i)).toBeInTheDocument();
  });

  it('toggling stitches on reflects in the saved sheet', () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('✂ Allow stitches'));
    tap(screen.getByText('Save settings'));
    expect(screen.getByText(/stitches: on/i)).toBeInTheDocument();
  });

  it('✕ closes settings and returns to video view', () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('✕'));
    expect(screen.queryByText('Privacy settings')).not.toBeInTheDocument();
    expect(screen.getByText('Your video')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('PrivacySavedSheet', () => {
  const savePrivacy = () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('Save settings'));
  };

  it('shows Preferences saved confirmation', () => {
    savePrivacy();
    expect(screen.getByText('Preferences saved')).toBeInTheDocument();
  });

  it('shows the per-video scope note', () => {
    savePrivacy();
    expect(screen.getByText(/these settings apply to this video only/i)).toBeInTheDocument();
  });

  it('Change settings returns to privacy sheet', () => {
    savePrivacy();
    tap(screen.getByText('Change settings'));
    expect(screen.getByText('Privacy settings')).toBeInTheDocument();
    expect(screen.queryByText('Preferences saved')).not.toBeInTheDocument();
  });

  it('Done closes everything and returns to profile grid', () => {
    savePrivacy();
    tap(screen.getByText('Done'));
    expect(screen.queryByText('Preferences saved')).not.toBeInTheDocument();
    expect(screen.getByText('@layan')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('StitchClipSelector — filmstrip interaction', () => {
  const openClipSelector = () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Stitch')[0]);
  };

  it('defaults to 5.0s selected', () => {
    openClipSelector();
    expect(screen.getByText('5.0s selected')).toBeInTheDocument();
  });

  it('tapping a lower frame updates the selection label', () => {
    openClipSelector();
    tap(document.querySelector('[data-testid="frame-2"]'));
    expect(screen.getByText('2.0s selected')).toBeInTheDocument();
  });

  it('tapping the last frame selects 10.0s', () => {
    openClipSelector();
    tap(document.querySelector('[data-testid="frame-10"]'));
    expect(screen.getByText('10.0s selected')).toBeInTheDocument();
  });

  it('shows the creator username in the preview area', () => {
    openClipSelector();
    expect(screen.getByText(/@tomharvey's video/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('StitchRecordScreen — duration selector', () => {
  const openRecordScreen = () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Stitch')[0]);
    tap(screen.getByText('Next'));
  };

  it('defaults to 15s duration', () => {
    openRecordScreen();
    expect(screen.getByText('15s')).toBeInTheDocument();
  });

  it('switching to 60s duration is reflected', () => {
    openRecordScreen();
    tap(screen.getByText('60s'));
    expect(screen.getByText('60s')).toBeInTheDocument();
  });

  it('shows the POST label', () => {
    openRecordScreen();
    expect(screen.getByText('POST')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────
describe('Consent cues — presence audit', () => {
  it('MainShareSheet always shows the consent banner', () => {
    render(<App />);
    openShareSheet();
    expect(screen.getByText(/may reach audiences beyond the original context/i)).toBeInTheDocument();
  });

  it('MainShareSheet consent banner covers Repost, Duet and Stitch', () => {
    render(<App />);
    openShareSheet();
    const banner = screen.getByText(/may reach audiences beyond the original context/i).closest('div');
    expect(within(banner).getByText('Repost')).toBeInTheDocument();
    expect(within(banner).getByText('Duet')).toBeInTheDocument();
    expect(within(banner).getByText('Stitch')).toBeInTheDocument();
  });

  it('RepostInfoPanel explains audience expansion', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getByText('i'));
    expect(screen.getByText(/expanding its reach beyond the original creator/i)).toBeInTheDocument();
    expect(screen.getByText(/original creator will be notified/i)).toBeInTheDocument();
  });

  it('DuetSetupScreen consent banner is present before recording', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Duet')[0]);
    expect(screen.getByText(/may reach audiences beyond the original post/i)).toBeInTheDocument();
  });

  it('AboutDuetsPanel explains creator cannot remove your duet', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Duet')[0]);
    tap(screen.getByText('!'));
    expect(screen.getByText(/cannot remove your duet/i)).toBeInTheDocument();
  });

  it('StitchClipSelector strong cue warns before stitching', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Stitch')[0]);
    expect(screen.getByText(/before you stitch/i)).toBeInTheDocument();
    expect(screen.getByText(/5 seconds/i)).toBeInTheDocument();
  });

  it('StitchRecordScreen repeats consent banner during recording', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Stitch')[0]);
    tap(screen.getByText('Next'));
    expect(screen.getByText(/you are stitching/i)).toBeInTheDocument();
    expect(screen.getByText(/different audience and context/i)).toBeInTheDocument();
  });

  it('AboutStitchingPanel advises considering original intent', () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Stitch')[0]);
    tap(screen.getByText('Next'));
    const bangs = screen.getAllByText('!');
    tap(bangs[bangs.length - 1]);
    expect(screen.getByText(/consider whether your new framing/i)).toBeInTheDocument();
    expect(screen.getByText(/will be credited automatically/i)).toBeInTheDocument();
  });

  it('PrivacySettingsSheet explains duet and stitch permissions', () => {
    render(<App />);
    openPrivacySettings();
    expect(screen.getByText(/side-by-side videos/i)).toBeInTheDocument();
    expect(screen.getByText(/embed a clip in their posts/i)).toBeInTheDocument();
  });

  it('PrivacySavedSheet reminds user settings are per-video only', () => {
    render(<App />);
    openPrivacySettings();
    tap(screen.getByText('Save settings'));
    expect(screen.getByText(/these settings apply to this video only/i)).toBeInTheDocument();
  });
});

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// ─── helpers ──────────────────────────────────────────────────
const tap = (el) => userEvent.click(el);

const getNav = (label) =>
  screen.getByText(label, { selector: 'div' }); // bottom nav divs

/* Open the share sheet from the FYP action bar */
const openShareSheet = () => {
  // The ↗ share button in the first FYP slide
  const shareBtn = screen.getAllByText('↗')[0];
  tap(shareBtn);
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
describe('Bottom navigation', () => {
  it('starts on the home / FYP tab', () => {
    render(<App />);
    // FYP top nav label is visible
    expect(screen.getByText('For you')).toBeInTheDocument();
  });

  it('switches to Friends tab', () => {
    render(<App />);
    tap(screen.getByText('Friends'));
    // Friends feed header
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
    // the dim overlay is a sibling div behind the sheet
    const backdrop = document.querySelector('[style*="rgba(0,0,0,0.35)"]');
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
  const goToRepostSheet = () => {
    render(<App />);
    openShareSheet();
    tap(screen.getAllByText('Repost')[0]);
  };

  it('main sheet Repost button opens RepostSheet', () => {
    goToRepostSheet();
    expect(screen.getByText(/allows reposts/i)).toBeInTheDocument();
  });

  it('RepostSheet shows the first FYP video creator username', () => {
    goToRepostSheet();
    // First FYP video is @tomharvey
    expect(screen.getByText(/@tomharvey allows reposts/i)).toBeInTheDocument();
  });

  it('tapping Repost confirms and shows the toast', () => {
    goToRepostSheet();
    // The red "Repost" confirm button inside the consent row
    const repostBtns = screen.getAllByText('Repost');
    // Last one is the inline confirm button
    tap(repostBtns[repostBtns.length - 1]);
    expect(screen.getByText('Reposted!')).toBeInTheDocument();
    expect(screen.getByText(/added to your followers' feeds/i)).toBeInTheDocument();
  });

  it('tapping ✕ on toast closes it', () => {
    goToRepostSheet();
    const repostBtns = screen.getAllByText('Repost');
    tap(repostBtns[repostBtns.length - 1]);
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
    tap(screen.getByText('Duet'));
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
    tap(screen.getByText('Stitch'));
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
    tap(bangs[bangs.length - 1]); // the info ! button
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
  it('share sheet from Friends tab shows that video\'s creator', () => {
    render(<App />);
    // Switch to Friends tab
    tap(screen.getByText('Friends'));
    // First Friends video is mia.designs
    const shareBtn = screen.getAllByText('↗')[0];
    tap(shareBtn);
    tap(screen.getAllByText('Repost')[0]);
    expect(screen.getByText(/@mia.designs allows reposts/i)).toBeInTheDocument();
  });
});

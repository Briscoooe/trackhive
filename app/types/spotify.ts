type SpotifyImageObject = {
  url: string;
  height: number | null;
  width: number | null;
};

export type SpotifySimplifiedPlaylistObject = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string | null;
      total: number;
    };
    href: string;
    id: string;
    type: "user";
    uri: string;
    display_name: string | null;
    is_spotify: boolean; // THIS IS A CUSTOM FIELD
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: "playlist";
  uri: string;
};
export type SpotifyPlaylistSearchResponse = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifySimplifiedPlaylistObject[];
};

export type SpotifySimplifiedArtistObject = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
};

export type SpotifyArtistObject = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
};

export type SpotifyTrackObject = {
  album: {
    album_type: "album" | "single" | "compilation";
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImageObject[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions: {
      reason: "market" | "product" | "explicit";
    };
    type: "album";
    uri: string;
    copyrights: {
      text: string;
      type: "C" | "P";
    }[];
    external_ids: {
      isrc: string;
      ean: string;
      upc: string;
    };
    genres: string[];
    label: string;
    popularity: number;
    album_group: "album" | "single" | "compilation" | "appears_on";
    artists: SpotifySimplifiedArtistObject[];
  };
  artists: SpotifyArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  restrictions: {
    reason: "market" | "product" | "explicit";
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
};

export type SpotifyEpisodeObject = {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImageObject[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  resume_point: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  type: "episode";
  uri: string;
  restrictions: {
    reason: "market" | "product" | "explicit";
  };
  show: {
    available_markets: string[];
    copyrights: {
      text: string;
      type: "C" | "P";
    }[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImageObject[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
  };
};

export type SpotifyPlaylistTrackObject = {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string | null;
      total: number;
    };
    href: string;
    id: string;
    type: "user";
    uri: string;
  };
  is_local: boolean;
  track: SpotifyTrackObject | SpotifyEpisodeObject;
};
export type SpotifyPlaylistItemsResponse = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyPlaylistTrackObject[];
};

export type SpotifyUserObject = {
  id: string;
  email: string;
};

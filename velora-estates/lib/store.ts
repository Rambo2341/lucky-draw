"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny browser-only store for set-aside cards and viewing requests.
 * Persists to localStorage when available and degrades to memory when not
 * (private windows, blocked storage).
 */

export type ViewingRequest = {
  ref: string;
  slug: string;
  date: string;
  time: string;
  name: string;
  created: string;
};

type State = { saved: string[]; requests: ViewingRequest[] };

const KEY = "velora:v1";
const empty: State = { saved: [], requests: [] };
let state: State = empty;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<State>;
      state = {
        saved: Array.isArray(parsed.saved) ? parsed.saved.filter((s) => typeof s === "string") : [],
        requests: Array.isArray(parsed.requests) ? parsed.requests : [],
      };
    }
  } catch {
    state = empty;
  }
}

function commit(next: State) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: keep in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => empty;

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const actions = {
  toggleSaved(slug: string) {
    load();
    const saved = state.saved.includes(slug) ? state.saved.filter((s) => s !== slug) : [slug, ...state.saved];
    commit({ ...state, saved });
  },
  clearSaved() {
    load();
    commit({ ...state, saved: [] });
  },
  addRequest(r: Omit<ViewingRequest, "ref" | "created">): ViewingRequest {
    load();
    const ref = `VE-APPT-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const request = { ...r, ref, created: new Date().toISOString() };
    commit({ ...state, requests: [request, ...state.requests] });
    return request;
  },
};

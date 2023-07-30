import styled from '@emotion/styled';
import { useMemo } from 'react';
import sanitizeHtml from 'sanitize-html';

interface SanitizeHTMLProps {
  html: string;
  limit?: number;
}

const StyledPreview = styled.div`
  p {
    margin: 0.5rem 0;
  }

  a {
    color: #fb923c;
    text-decoration: none;
  }

  img,
  video {
    max-width: 80%;
    margin: 2rem auto;
  }

  pre {
    margin: 0 1rem;

    code {
      white-space: pre-wrap;
    }
  }
`;

const sanitizeOptions: sanitizeHtml.IOptions = {
  ...sanitizeHtml.defaults,
  allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'video', 'figure'],
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        target: '_blank',
        rel: 'noopener noreferrer',
        href: attribs.href?.startsWith('/') ? '' : attribs.href,
      },
    }),
  },
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    video: ['controls', 'src'],
  },
};

export default function SanitizeHTML({ html, limit = 0 }: SanitizeHTMLProps) {
  const sanitized = useMemo(() => {
    const treated = sanitizeHtml(html, sanitizeOptions);

    return limit === 0
      ? treated
      : `${treated.slice(0, limit).replaceAll('\n', ' ').trim()}...`;
  }, [html, limit]);

  return (
    <StyledPreview
      dangerouslySetInnerHTML={{
        __html: sanitized,
      }}
    />
  );
}

import styled from '@emotion/styled';
import { useMemo } from 'react';
import sanitizeHtml from 'sanitize-html';

interface SanitizeHTMLProps {
  html: string;
  limit?: number;
}

const StyledPreview = styled.div`
  a {
    color: #fb923c;
    text-decoration: none;
  }

  img {
    max-width: 100%;
  }
`;

const sanitizeOptions: sanitizeHtml.IOptions = {
  ...sanitizeHtml.defaults,
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { target: '_blank' }),
  },
};

export default function SanitizeHTML({ html, limit = 0 }: SanitizeHTMLProps) {
  const sanitized = useMemo(() => {
    const treated =
      limit === 0
        ? html
        : `${html.slice(0, limit).replaceAll('\n', ' ').trim()}...`;

    return sanitizeHtml(treated, sanitizeOptions);
  }, [html, limit]);

  return (
    <StyledPreview
      dangerouslySetInnerHTML={{
        __html: sanitized,
      }}
    />
  );
}
